import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() parkingHour!: string;
@Input() parkingAmount!: number;

  @Output() isDone = new EventEmitter();
  constructor(public activeModal: NgbModal) { }

  ngOnInit(): void {
  }

  confirm(){
    this.isDone.emit(true);
  }

  closeForm() {
    this.isDone.emit(false);
    this.activeModal.dismissAll();
  }
}
