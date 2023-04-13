import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubUser } from 'src/app/data-model/User';

@Component({
  selector: 'app-add-or-update-sub-user',
  templateUrl: './add-or-update-sub-user.component.html',
  styleUrls: ['./add-or-update-sub-user.component.scss']
})
export class AddOrUpdateSubUserComponent implements OnInit {
  
  isToDoComplete! : boolean;
  isNameNInvalid = false;
  isDescriptionInvalid = false;
  formHeading! : string;
  buttonText!: string;
  subUserForm! : FormGroup;
 
  @Input() isNewSubUser! : boolean;
  @Input() subUser! : SubUser;

  constructor(private _modalService: NgbModal,private fb: FormBuilder,) { }
  
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
        location: this.subUser.location,
        slotCount: this.subUser.slotCount,
        password: '',
        confirmPassword:''
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
    if(this.subUserForm.valid){}
  }

  update(){
    if(this.subUserForm.valid){}
  }

  isToComplete(event: any){
    this.isToDoComplete = event;
  }
}
