export class Revenue{
    userId!: number;
    date!: Date;
    amount!: number;
    constructor(userId: number, date: Date, amount: number){
        this.userId = userId;
        this.date = date;
        this.amount = amount;
    }
}

export class RevenueResponse{
    userId!: number;
        name!: string;
        email!: string;
        contactNumber!: string;
        isActive!: boolean;
        isDeleted!: boolean;
        parentId!: number;
        location!: string;
        slotCount!: number;
        totalRevenue!: number;
        constructor(userId: number, name: string, email: string, contactNumber: string, isActive: boolean, isDeleted:boolean, parentId: number, location: string, slotCount: number, totalRevenue: number){
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.contactNumber = contactNumber;
            this.isActive = isActive;
            this.isDeleted = isDeleted;
            this.parentId = parentId;
            this.location = location;
            this.slotCount = slotCount;
            this.totalRevenue = totalRevenue;
        }
}