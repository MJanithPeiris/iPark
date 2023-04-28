import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingLot } from 'src/app/data-model/ParkingSlot';
import { ResponseModel, User, UserRequest } from 'src/app/data-model/User';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-or-update-sub-user',
  templateUrl: './add-or-update-sub-user.component.html',
  styleUrls: ['./add-or-update-sub-user.component.scss']
})
export class AddOrUpdateSubUserComponent implements OnInit {
  
  isToDoComplete! : boolean;
  isPasswordMatched = true;
  // isNameInvalid = false;
  // isDescriptionInvalid = false;
  formHeading! : string;
  buttonText!: string;
  subUserForm! : FormGroup;
 
  @Input() parentId!: number;
  @Input() isNewSubUser! : boolean;
  @Input() subUser! : User;

  @Output() isDone = new EventEmitter();

  constructor(private _modalService: NgbModal,private fb: FormBuilder,private _userService : UserService, private notifyService: NotificationService) { }
  
  ngOnInit(): void {
    this.subUserForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]],
      userRole: ['Parking', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]],
      slotCount: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      location: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]],
    });
    
    this.formHeading = this.isNewSubUser? "Add new Sub User": "Update Sub User";
    this.buttonText = this.isNewSubUser? "Add": "Update";
    
    if(!this.isNewSubUser){
      this.subUserForm.setValue({
        name: this.subUser.name,
        email: this.subUser.email,
        contactNumber: this.subUser.contactNumber,
        userRole: this.subUser.userRole,
        location: this.subUser.parkingLot.location,
        slotCount: this.subUser.parkingLot.slotCount,
        password: 'password',
        confirmPassword:'password'
      });
    }
  }

  get name() {
    return this.subUserForm.get('name')!;
  }

  get email(){
    return this.subUserForm.get('email')!;
  }

  get contactNumber(){
    return this.subUserForm.get('contactNumber')!;
  }
  get userRole(){
    return this.subUserForm.get('userRole')!;
  }
  get slotCount(){
    return this.subUserForm.get('slotCount')!;
  }
  get location(){
    return this.subUserForm.get('location')!;
  }
  get password(){
    return this.subUserForm.get('password')!;
  }
  get confirmPassword(){
    return this.subUserForm.get('confirmPassword')!;
  }

  closeForm(){
     this._modalService.dismissAll();
  }

  addToList(){
    if(this.subUserForm.valid){
      if(this.subUserForm.value.password == this.subUserForm.value.confirmPassword){
        let userRequest = new UserRequest();
        userRequest.name = this.subUserForm.value.name;
        userRequest.email = this.subUserForm.value.email;
        userRequest.contactNumber = this.subUserForm.value.contactNumber;
        userRequest.userRole = this.subUserForm.value.userRole;
        userRequest.password = this.subUserForm.value.password;
        userRequest.parentId = this.parentId;
        userRequest.parkingLot = new ParkingLot(this.subUserForm.value.slotCount, this.subUserForm.value.location)
        
        this._userService.addUser(userRequest).subscribe({
          next: (res: ResponseModel) => {
              this.isDone.emit(res);
              this._modalService.dismissAll();
          },
          error: (error) => {
            this.isDone.emit({response: false, message: 'Error occurred while updating the user', model: error});
          },
        })
      }else{
        this.isPasswordMatched = false;
      }
    }
  }

  update(){
    if(this.subUserForm.valid){
      let userRequest = new UserRequest();
      userRequest.userId = this.subUser.userId;
      userRequest.name = this.subUserForm.value.name;
      userRequest.email = this.subUserForm.value.email;
      userRequest.contactNumber = this.subUserForm.value.contactNumber;
      userRequest.parentId = this.parentId;
      userRequest.parkingLot = new ParkingLot(this.subUserForm.value.slotCount, this.subUserForm.value.location)
      this._userService.updateUser(userRequest).subscribe({
        next: (res: ResponseModel) => {
          this.isDone.emit(res);
          this._modalService.dismissAll();
        },
        error: (error) => {
          this.isDone.emit({response: false, message: 'Error occurred while updating the user', model: error});
        },
      })
    }
  }

  isToComplete(event: any){
    this.isToDoComplete = event;
  }
}
