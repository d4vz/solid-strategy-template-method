import { Room } from '../../domain/entities/room.entity'

export interface RoomRepository {
  findById(id: string): Promise<Room | null>
  create: (room: Room) => Promise<void>
}
