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