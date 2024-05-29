import { faker } from '@faker-js/faker'
import { MakeReservationUseCase } from '../src/application/usecases/make-reservation.usecase'
import { MakeReservationDto } from '../src/domain/dtos/reservation/make-reservation.dto'
import { Room } from '../src/domain/entities/room.entity'
import { InMemoryReservationRepository } from '../src/infrastructure/repositories/in-memory/in-memory-reservation.repository'
import { InMemoryRoomRepository } from '../src/infrastructure/repositories/in-memory/in-memory-room.repository'

test('Create Reservation UseCase', async () => {
  const reservationRepository = new InMemoryReservationRepository()
  const roomRepository = new InMemoryRoomRepository()

  const price = faker.number.int({ min: 100, max: 1000 })

  const mockRoom = Room.create(price)
  await roomRepository.create(mockRoom)

  const makeReservationUseCase = new MakeReservationUseCase(
    reservationRepository,
    roomRepository
  )

  const now = new Date()
  const tommorow = new Date()
  tommorow.setDate(now.getDate() + 1)

  const input = new MakeReservationDto({
    checkinDate: now,
    checkoutDate: tommorow,
    email: faker.internet.email(),
    roomId: mockRoom.id
  })

  const output = await makeReservationUseCase.execute(input)

  expect(output).toHaveProperty('id')
  expect(output).toHaveProperty('email', input.email)
  expect(output).toHaveProperty('roomId', input.roomId)

  const reservation = await reservationRepository.findById(output.id)

  expect(reservation).toHaveProperty('id', output.id)
  expect(reservation).toHaveProperty('email', output.email)
  expect(reservation).toHaveProperty('roomId', output.roomId)
})
