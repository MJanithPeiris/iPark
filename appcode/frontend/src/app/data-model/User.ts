import { ParkingLot } from "./ParkingSlot";

export class User{
    id!: number;
    name!: string;
    email!: string;
    contactNumber!: string;
    userRole!:string;
    isActive!: boolean;
    // password!: string;
    subUsers! : SubUser[];
}

export class SubUser{
    id!: number;
    name!: string;
    email!: string;
    contactNumber!: string;
    userRole!:string;
    isActive!: boolean;
    location!: string;
    slotCount!: string;
    // password!: string;
    parentId! : number;
  }

export class ResponseModel{
response!: boolean;
  id!: string;
  userId!: number;
  name!: string;
  email!: string;
  contactNumber!: string;
  isActive!: boolean;
  isDeleted!: boolean;
  userRole!: string[];
  parentId!: number;
  parkingLot!: ParkingLot;
  accessToken!: string
}