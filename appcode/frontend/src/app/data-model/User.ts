import { ParkingLot } from "./ParkingSlot";

export class User{
  id!: number;
  userId!: number;
  name!: string;
  email!: string;
  contactNumber!: string;
  isActive!: boolean;
  isDeleted!: boolean;
  userRole!: string;
  parentId!: number;
  parkingLot!: ParkingLot;
  accessToken!: string;
  subUsers!: User[];
}

export class UserRequest{
    userId!: number;
    name!: string;
    email!: string;
    contactNumber!: string;
    password!: string;
    parentId! : number;
    parkingLot!: ParkingLot;
    userRole!: string[];
  }

// export class SubUser{
//     id!: number;
//     name!: string;
//     email!: string;
//     contactNumber!: string;
//     userRole!:string;
//     isActive!: boolean;
//     location!: string;
//     slotCount!: string;
//     // password!: string;
//     parentId! : number;
//   }

export class ResponseModel{
response!: boolean;
 message!: string;
 model !: any;
}