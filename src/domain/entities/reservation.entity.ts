import { v4 as uuid } from 'uuid'
import { Room } from './room.entity'

export class Reservation {
  constructor(
    readonly id: string,
    readonly roomId: string,
    readonly email: string,
    readonly checkinDate: Date,
    readonly checkoutDate: Date,
    private durationInDays: number,
    private price: number
  ) {}

  static create(
    roomId: string,
    email: string,
    checkinDate: Date,
    checkoutDate: Date
  ): Reservation {
    const id = uuid()
    return new Reservation(id, roomId, email, checkinDate, checkoutDate, 0, 0)
  }

  public calculatePrice(room: Room): void {
    const diffInTime = this.checkoutDate.getTime() - this.checkinDate.getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    this.durationInDays = diffInDays
    this.price = diffInDays * room.price
  }

  public getPrice() {
    return this.price
  }

  public getDurationInDays() {
    return this.durationInDays
  }
}
