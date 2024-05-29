import { v4 as uuid } from 'uuid'

export class Room {
  constructor(readonly id: string, readonly price: number) {}

  static create(price: number): Room {
    const id = uuid()
    return new Room(id, price)
  }
}
