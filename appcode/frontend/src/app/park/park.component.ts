import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { User } from '../data-model/User';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent implements OnInit {

  user!: User;

  constructor(private modalService: NgbModal, private notifyService : NotificationService,private _userService: UserService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if(userId){
      this._userService.getUserByUserId(parseInt(userId)).subscribe({
        next: (res: User) => {
          this.user = res;
        },
        error(err) {},
      });
    }
    
  }

  test(a : any){
    console.log(a);
  }

  openForm(content : any){
    this.modalService.open(content);
  }

  isDone(res : any){
    if (res.response) {
      this.notifyService.showSuccess(res.message, '');
    } else {
      this.notifyService.showError(res.message, '');
    }
  }

}
