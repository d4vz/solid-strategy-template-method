import { RoomRepository } from '../../../application/repositories/room.repository'
import { Room } from '../../../domain/entities/room.entity'

export class InMemoryRoomRepository implements RoomRepository {
  private rooms: Room[] = []

  async findById(id: string) {
    const room = this.rooms.find((room) => room.id === id)
    return room || null
  }

  async create(room: Room) {
    this.rooms.push(room)
  }
}
