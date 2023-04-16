export class ParkingSlot{
    vehicleNumber!: string;
    vehicleType!: string;
    contactNumber!: string;
    parkingSlot!: number;
    inTime!: Date;
    pricePerHour!: number;
}

export class ParkingLot{
    _id!: string;
  userId!: number;
  slotCount!: number;
  location!: string;
  slotInfo!: Slot[];
}

export class Slot{
    _id!: string;
    id!: number;
    status!: boolean;
    vehicleNumber!: string;
    vehicleType!: string;
    contactNumber!: string;
    inTime!: Date | null;
    pricePerHour!: number;
}