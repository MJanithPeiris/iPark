// export class ParkingSlot{
//     vehicleNumber!: string;
//     vehicleType!: string;
//     contactNumber!: string;
//     parkingSlot!: number;
//     inTime!: Date;
//     pricePerHour!: number;
// }

export class ParkingLot{
    _id!: string;
  userId!: number;
  slotCount!: number;
  location!: string;
  slotInfo!: Slot[];


  constructor(slotCount?: number, location?: string);
  
  constructor(slotCount: number, location: string){
    this.slotCount = slotCount;
    this.location = location;
  }
}

export class Slot{
    _id!: string;
    id!: number;
    status!: boolean;
    vehicleNumber!: string;
    vehicleType!: string;
    contactNumber!: string;
    inTime!: Date;
    pricePerHour!: number;
}