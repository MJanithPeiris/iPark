import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  @Input() isForDelete! : boolean;
  @Input() status! : boolean;
  @Output() isDone = new EventEmitter();

  activateStatus! : string;
  
  constructor(private _modalService: NgbModal) { }
  ngOnInit(): void {
    if(this.status){
      this.activateStatus = 'deactivate';
    }else{
      this.activateStatus = 'activate';
    }
  }

  deleteToDo(){
    this.isDone.emit(true);
    this._modalService.dismissAll();
  }

  completeToDo(){
    this.isDone.emit(true);
    this._modalService.dismissAll();
  }

  cancel(){
    this.isDone.emit(false);
    this._modalService.dismissAll();
  }

}
