import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingLot, Slot } from 'src/app/data-model/ParkingSlot';
import { NotificationService } from 'src/app/services/notification.service';
import { ParkingLotService } from 'src/app/services/parking-lot.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  parkingLot! : ParkingLot;
  selectedSlot!: Slot;

  constructor(private router: Router, private _parkingLotService : ParkingLotService, private _modalService: NgbModal, private notifyService: NotificationService,) { }

  ngOnInit(): void {  
    this.refreshPage();
  }
  goBack(){
    this.router.navigate(['parking']);
  }

  slotInfo(slot: Slot, content: any){
    console.log(slot)
    if(slot.status){
      this.selectedSlot = slot;
      this._modalService.open(content);
    }else{
      this.notifyService.showInfo('Slot number '+ slot.id +' is empty!!','')
    }
  }
  isDone(res : any){
    if (res.response) {
      this.notifyService.showSuccess(res.message, '');
      this.refreshPage();
    } else {
      this.notifyService.showError(res.message, '');
    }
  }

  refreshPage(){
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this._parkingLotService.getParkingInfo(parseInt(userId)).subscribe({
        next: (res: ParkingLot) => {
          this.parkingLot = res;
          console.log(this.parkingLot);
          
        },
        error(err) {},
      });
    }
  }

}

