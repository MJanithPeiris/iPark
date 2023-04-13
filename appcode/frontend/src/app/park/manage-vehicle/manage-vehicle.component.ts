import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss']
})
export class ManageVehicleComponent implements OnInit {

  formHeading! : string;
  buttonText!: string;
  vehicleForm! : FormGroup;
  slotList!: number[];
  vehicleTypeList! : string[];
 
  @Input() isNewVehicle! : boolean;

  @Output() isDone = new EventEmitter();

  constructor(private _modalService: NgbModal,private fb: FormBuilder,) { }
  
  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleNumber: [, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)
      ]],
      contactNumber: [, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]],
      vehicleType: ['Select', [
        Validators.required,
        this.notEqualValidator('Select')
      ]],
      parkingSlot: ['Select', [
        Validators.required, 
        this.notEqualValidator('Select')
      ]],
      inTime: [],
      pricePerHour: []
    });
    
    this.formHeading = this.isNewVehicle? "Park a Vehicle": "Take Over a Vehicle";
    this.buttonText = this.isNewVehicle? "Park": "Take Over";
    
    if(!this.isNewVehicle){
      this.vehicleForm.setValue({
        vehicleNumber: '',
        vehicleType: '',
        contactNumber: '',
        parkingSlot: '',
        inTime: '',
        pricePerHour: ''
      })
    }
    this.slotList = [1,2,3,4,5,6,7];
    this.vehicleTypeList = ["Car", "Motorcycle", "Bicycle", "Van", "SUV"];
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

  get vehicleType(){
    return this.vehicleForm.get('vehicleType')!;
  }
  get contactNumber(){
    return this.vehicleForm.get('contactNumber')!;
  }
  get parkingSlot(){
    return this.vehicleForm.get('parkingSlot')!;
  }
  get inTime(){
    return this.vehicleForm.get('inTime')!;
  }
  get pricePerHour(){
    return this.vehicleForm.get('pricePerHour')!;
  }

  closeForm(){
     this._modalService.dismissAll();
  }

  park(){
    
    // this.vehicleForm.setValue({
    //   pricePerHour: 200,
    //   inTime: Date.now,
    // })
    console.log(this.vehicleForm.valid)
    console.log(this.vehicleForm.value)
    if(this.vehicleForm.valid){
      this.isDone.emit(true);
      this._modalService.dismissAll();
    }
    // else{
    //   this.isDone.emit(false);
    //   this._modalService.dismissAll();
    // }
  }

  takeOver(){
    if(this.vehicleForm.valid){
      this.isDone.emit(true);
      this._modalService.dismissAll();
    }
    // else{
    //   this.isDone.emit(false);
    //   this._modalService.dismissAll();
    // }
  }

}
