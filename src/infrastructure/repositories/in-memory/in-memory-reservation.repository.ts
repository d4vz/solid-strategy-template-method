import { ReservationRepository } from '../../../application/repositories/reservation.repository'
import { Reservation } from '../../../domain/entities/reservation.entity'

export class InMemoryReservationRepository implements ReservationRepository {
  private reservations: Reservation[] = []

  async create(reservation: Reservation) {
    this.reservations.push(reservation)
  }

  async findById(id: string) {
    const reservation = this.reservations.find(
      (reservation) => reservation.id === id
    )

    return reservation || null
  }
}
