import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel, User, UserRequest } from 'src/app/data-model/User';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';


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
  userRoles!: string[];
  isPasswordMatched = true;
 
  @Input() isNewUser! : boolean;
  @Input() user! : User;

  @Output() isDone = new EventEmitter();

  constructor(private _modalService: NgbModal,private fb: FormBuilder, private _userService : UserService, private notifyService: NotificationService) { }
  
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
      userRole: ['Select', [
        Validators.required,
        this.notEqualValidator('Select')
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
        confirmPassword:'password'
      })
    }
    
    this.userRoles = ["SuperAdmin", "Company"];

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

  notEqualValidator(notEqualValue: any) {
    return (control: { value: any }) => {
      const isValid = control.value !== notEqualValue;
      return isValid ? null : { notEqual: { value: control.value } };
    };
  }

  closeForm(){
     this._modalService.dismissAll();
  }

  addToList(){
    if(this.userForm.valid){
      if(this.userForm.value.password === this.userForm.value.confirmPassword){
        let userRequest = new UserRequest();
        userRequest.name = this.userForm.value.name;
        userRequest.email = this.userForm.value.email;
        userRequest.contactNumber = this.userForm.value.contactNumber;
        userRequest.userRole = this.userForm.value.userRole;
        userRequest.password = this.userForm.value.password;
        
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
    if(this.userForm.valid){
      let userRequest = new UserRequest();
      userRequest.userId = this.user.userId;
      userRequest.name = this.userForm.value.name;
      userRequest.email = this.userForm.value.email;
      userRequest.contactNumber = this.userForm.value.contactNumber;
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
