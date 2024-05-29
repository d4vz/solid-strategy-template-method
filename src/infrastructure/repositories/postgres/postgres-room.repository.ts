import { RoomRepository } from '../../../application/repositories/room.repository'
import { Room } from '../../../domain/entities/room.entity'
import { createPgConn } from '../../utils/create-pgp-conn'

export class PostgresRoomRepository implements RoomRepository {
  async create(room: Room): Promise<void> {
    const { connection, close } = createPgConn()

    const query = 'insert into rooms (id, price) values ($1, $2)'
    await connection.query(query, [room.id, room.price])

    await close()
  }

  async findById(id: string): Promise<Room | null> {
    const { connection, close } = createPgConn()

    const query = 'select * from rooms where id = $1'
    const [room] = await connection.query(query, [id])

    await close()

    if (!room) return null
    return new Room(room.id, parseFloat(room.price))
  }
}
