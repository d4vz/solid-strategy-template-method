import { Reservation } from '../../domain/entities/reservation.entity'

export interface ReservationRepository {
  create: (reservation: Reservation) => Promise<void>
  findById: (id: string) => Promise<Reservation | null>
}
