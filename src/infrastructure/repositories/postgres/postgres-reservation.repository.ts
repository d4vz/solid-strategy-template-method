import { ReservationRepository } from '../../../application/repositories/reservation.repository'
import { Reservation } from '../../../domain/entities/reservation.entity'
import { createPgConn } from '../../utils/create-pgp-conn'

export class PostgresReservationRepository implements ReservationRepository {
  async findById(id: string) {
    const { connection, close } = createPgConn()

    const query = 'select * from reservations where id = $1'
    const [reservation] = await connection.query(query, [id])

    await close()

    return new Reservation(
      reservation.id,
      reservation.room_id,
      reservation.email,
      reservation.checkin_date,
      reservation.checkout_date,
      reservation.duration_in_days,
      parseFloat(reservation.price)
    )
  }

  async create(reservation: Reservation) {
    const { connection, close } = createPgConn()

    const query =
      'insert into reservations (id, room_id, email, checkin_date, checkout_date, duration_in_days, price) values ($1, $2, $3, $4, $5, $6, $7)'

    await connection.query(query, [
      reservation.id,
      reservation.roomId,
      reservation.email,
      reservation.checkinDate,
      reservation.checkoutDate,
      reservation.getDurationInDays(),
      reservation.getPrice()
    ])

    await close()
  }
}
