import { MakeReservationDto } from '../../domain/dtos/reservation/make-reservation.dto'
import { Reservation } from '../../domain/entities/reservation.entity'
import { ReservationRepository } from '../repositories/reservation.repository'
import { RoomRepository } from '../repositories/room.repository'

export class MakeReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(input: MakeReservationDto) {
    const reservation = Reservation.create(
      input.roomId,
      input.email,
      input.checkinDate,
      input.checkoutDate
    )

    const room = await this.roomRepository.findById(reservation.roomId)

    if (!room) {
      throw new Error('Room not found')
    }

    reservation.calculatePrice(room)
    await this.reservationRepository.create(reservation)
    return reservation
  }
}
