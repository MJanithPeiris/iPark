import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/data-model/User';


@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.scss']
})
export class AddOrUpdateUserComponent implements OnInit {

  
  isToDoComplete! : boolean;
  isNameNInvalid = false;
  isDescriptionInvalid = false;
  formHeading! : string;
  buttonText!: string;
  userForm! : FormGroup;
 
  @Input() isNewUser! : boolean;
  @Input() user! : User;

  @Output() isDone = new EventEmitter();

  constructor(private _modalService: NgbModal,private fb: FormBuilder,) { }
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
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
      userRole: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
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
    
    this.formHeading = this.isNewUser? "Add new User": "Update User";
    this.buttonText = this.isNewUser? "Add": "Update";
    
    if(!this.isNewUser){
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
        contactNumber: this.user.contactNumber,
        userRole: this.user.userRole,
        password: 'password',
        confirmPassword:'confirmPassword'
      })
    }
    
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get email(){
    return this.userForm.get('email')!;
  }

  get contactNumber(){
    return this.userForm.get('contactNumber')!;
  }
  get userRole(){
    return this.userForm.get('userRole')!;
  }
  get password(){
    return this.userForm.get('password')!;
  }
  get confirmPassword(){
    return this.userForm.get('confirmPassword')!;
  }

  closeForm(){
     this._modalService.dismissAll();
  }

  addToList(){
    if(this.userForm.valid){
      this.isDone.emit(true);
      this._modalService.dismissAll();
    }else{
      this.isDone.emit(false);
      this._modalService.dismissAll();
    }
  }

  update(){
    if(this.userForm.valid){
      this.isDone.emit(true);
      this._modalService.dismissAll();
    }else{
      this.isDone.emit(false);
      this._modalService.dismissAll();
    }
  }

  isToComplete(event: any){
    this.isToDoComplete = event;
  }

}
