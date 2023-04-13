import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent implements OnInit {

  i: boolean = true;

  constructor(private modalService: NgbModal, private notifyService : NotificationService) {
    this.i = true;
   }

  ngOnInit(): void {
    // console.log('logsss');
    this.i = true;
  }
  test(a : any){
    console.log(a);
  }

  openForm(content : any){
    this.modalService.open(content);
  }

}
