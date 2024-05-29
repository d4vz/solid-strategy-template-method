export class MakeReservationDto {
  email: string
  roomId: string
  checkinDate: Date
  checkoutDate: Date

  constructor(props: MakeReservationDto) {
    this.email = props.email
    this.roomId = props.roomId
    this.checkinDate = props.checkinDate
    this.checkoutDate = props.checkoutDate
  }
}
