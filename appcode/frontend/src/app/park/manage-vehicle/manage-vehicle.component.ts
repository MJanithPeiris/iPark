import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Slot } from 'src/app/data-model/ParkingSlot';
import { ResponseModel, User } from 'src/app/data-model/User';
import { ParkingLotService } from 'src/app/services/parking-lot.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss'],
})
export class ManageVehicleComponent implements OnInit {
  formHeading!: string;
  buttonText!: string;
  vehicleForm!: FormGroup;
  slotNumbers: number[] = [];
  vehicleTypeList!: { type: string; amount: number }[];
  parkingTime: string = '';
  parkingAmount: number = 0;

  @Input() isNewVehicle!: boolean;
  @Input() onlyView : boolean = false;
  @Input() slot! : Slot;


  user!: User;

  @Output() isDone = new EventEmitter();

  constructor(
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private revenueService: RevenueService,
    private parkingLotService: ParkingLotService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleNumber: [
        ,
        [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
      ],
      contactNumber: [
        ,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      vehicleType: [
        'Select',
        [Validators.required, this.notEqualValidator('Select')],
      ],
      parkingSlot: [
        'Select',
        [Validators.required, this.notEqualValidator('Select')],
      ],
      inTime: [],
      pricePerHour: [],
    });

    this.formHeading = this.isNewVehicle
      ? 'Park a Vehicle'
      : 'Take Over a Vehicle';
    this.buttonText = this.isNewVehicle ? 'Park' : 'Take Over';

    if (!this.isNewVehicle) {
      this.vehicleForm.setValue({
        vehicleNumber: '',
        vehicleType: '',
        contactNumber: '',
        parkingSlot: '',
        inTime: '',
        pricePerHour: '',
      });
    }

    
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        this._userService.getUserByUserId(parseInt(userId)).subscribe({
          next: (res: User) => {
            this.user = res;
            let numbers = [];
            for (let i = 1; i <= res.parkingLot.slotCount; i++) {
              if (!this.user.parkingLot.slotInfo[i - 1].status) {
                numbers.push(i);
              }
            }
            this.slotNumbers = numbers;
          },
          error(err) {},
        });
      }
    

    if(this.onlyView){
      this.vehicleForm.setValue({
        vehicleNumber: this.slot.vehicleNumber,
        vehicleType: this.slot.vehicleType,
        contactNumber: this.slot.contactNumber,
        parkingSlot: this.slot.id,
        inTime: this.slot.inTime,
        pricePerHour: this.slot.pricePerHour,
      });
    }

    this.vehicleTypeList = [
      { type: 'Car', amount: 100 },
      { type: 'Motorcycle', amount: 50 },
      { type: 'Bicycle', amount: 10 },
      { type: 'Van', amount: 150 },
      { type: 'SUV', amount: 200 },
    ];
  }

  notEqualValidator(notEqualValue: any) {
    return (control: { value: any }) => {
      const isValid = control.value !== notEqualValue;
      return isValid ? null : { notEqual: { value: control.value } };
    };
  }

  get vehicleNumber() {
    return this.vehicleForm.get('vehicleNumber')!;
  }

  get vehicleType() {
    return this.vehicleForm.get('vehicleType')!;
  }
  get contactNumber() {
    return this.vehicleForm.get('contactNumber')!;
  }
  get parkingSlot() {
    return this.vehicleForm.get('parkingSlot')!;
  }
  get inTime() {
    return this.vehicleForm.get('inTime')!;
  }
  get pricePerHour() {
    return this.vehicleForm.get('pricePerHour')!;
  }

  closeForm() {
    this._modalService.dismissAll();
  }

  park() {
    if (this.vehicleForm.valid) {
      const slot = new Slot();
      slot.id = this.vehicleForm.value.parkingSlot;
      slot.status = true;
      slot.vehicleNumber = this.vehicleForm.value.vehicleNumber;
      slot.vehicleType = this.vehicleForm.value.vehicleType;
      slot.contactNumber = this.vehicleForm.value.contactNumber;
      slot.inTime = new Date();
      slot.pricePerHour = this.vehicleTypeList.filter(
        (_) => _.type == this.vehicleForm.value.vehicleType
      )[0].amount;

      this.parkingLotService
        .updateParkingSlotStatus(this.user.userId, slot)
        .subscribe({
          next: (res: ResponseModel) => {
            this.isDone.emit(res);
            this._modalService.dismissAll();
          },
          error: (error) => {
            this.isDone.emit({
              response: false,
              message: 'Error occurred while updating the parking',
              model: error,
            });
          },
        });
    }
  }

  takeOver(content: any) {
    if (this.vehicleForm.valid) {
      // this.isDone.emit(true);
      const slot = this.user.parkingLot.slotInfo.find(
        (_) => _.vehicleNumber == this.vehicleForm.value.vehicleNumber
      );
      if (slot) {
        const d = new Date();
        console.log('hhhhhh');
        const inTime = new Date(slot.inTime);

        console.log('in time : ' + inTime);
        console.log('out time : ' + d);

        const hourDifference = d.getTime() - inTime.getTime();
        // const hourDifference = Math.abs(d.getTime() - inTime.getTime()) / (1000 * 60 * 60);
        const hoursWaited = Math.abs(hourDifference) / (1000 * 60 * 60);
        this.parkingAmount =
          Math.round(hoursWaited * slot.pricePerHour * 100) / 100;

        const hours = Math.floor(hourDifference / 1000 / 60 / 60);
        const minutes = Math.floor((hourDifference / 1000 / 60) % 60);
        this.parkingTime = `${hours} hr ${minutes} min`;

        this._modalService.open(content, { centered: true, size: 'sm' });
      }

      // this._modalService.dismissAll();
    }
    // else{
    //   this.isDone.emit(false);
    //   this._modalService.dismissAll();
    // }
  }

  isToComplete(isTrue: boolean) {
    if (isTrue) {
      console.log(isTrue);
      this.revenueService
        .addRevenue({ userId: this.user.userId, amount: this.parkingAmount })
        .subscribe({
          next: (res: ResponseModel) => {
            if (res.response) {
              const slot = new Slot();
              slot.id = this.vehicleForm.value.parkingSlot;
              slot.status = false;
              this.parkingLotService
                .updateParkingSlotStatus(this.user.userId, slot)
                .subscribe({
                  next: (res2: ResponseModel) => {
                    this.isDone.emit(res);
                    this._modalService.dismissAll();
                  },
                  error: (error) => {
                    this.isDone.emit({
                      response: false,
                      message: 'Error occurred while updating the parking',
                      model: error,
                    });
                  },
                });
            }
          },
          error: (error) => {
            this.isDone.emit({
              response: false,
              message: 'Error occurred while updating the parking',
              model: error,
            });
          },
        });
    } else {
      console.log(isTrue);
    }
  }

  search() {
    if (this.user) {
      const slot = this.user.parkingLot.slotInfo.find(
        (_) => _.vehicleNumber == this.vehicleForm.value.vehicleNumber
      );
      if (slot) {
        this.vehicleForm.setValue({
          vehicleNumber: slot.vehicleNumber,
          vehicleType: slot.vehicleType,
          parkingSlot: slot.id,
          inTime: slot.inTime,
          pricePerHour: slot.pricePerHour,
          contactNumber: slot.contactNumber,
        });
      }
    }
  }
}
