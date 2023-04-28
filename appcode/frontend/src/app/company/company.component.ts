import { Component, OnInit } from '@angular/core';
import { ResponseModel, User } from '../data-model/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  user!: User;

  currentSubUser!: User;
  subUserList!: User[];
  subUserDisplayList!: User[];

  userFilter = new FormControl('', { nonNullable: true });

  selectedIndex = 0;

  popupString = 'Deactivate';
  isUser!: boolean;

  collectionSize!: number;
  page = 1;
  pageSize = 6;

  userId = 0;

  constructor(
    private modalService: NgbModal,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.refreshPage();
  }

  select() {}

  userSearch(text: string): User[] {
    return this.subUserList.filter((item) => {
      const term = text.toLowerCase();
      if (item && item.name && item.parkingLot.location && item.contactNumber) {
        return (
          // item.id.toString().includes(term) ||
          item.name.toLowerCase().includes(term) ||
          item.parkingLot.location.toLowerCase().includes(term) ||
          item.contactNumber.toLowerCase().includes(term)
        );
      } else {
        return [];
      }
    });
  }

  onSearchChange(text: string) {
    this.subUserDisplayList = this.userSearch(text);
    if (text === '') {
      this.page = this.page;
      this.refreshGrid();
    } else {
      this.refreshSearch();
    }
  }

  setId(id: number, a: User) {
    this.selectedIndex = id;
    this.currentSubUser = a;
  }


  openForm(content: any, _isNewToDo: boolean) {
    this.modalService.open(content);
  }

  setPopup(subUser: any, isUser: boolean) {
    this.isUser = isUser;
    this.currentSubUser = subUser;
    if (subUser.isActive) {
      this.popupString = 'Deactivate';
    } else {
      this.popupString = 'Activate';
    }
  }

  edit(content: any) {
    this.modalService.open(content);
  }


  isToDelete(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  deleteSubUser(isTrue: boolean) {
    if (isTrue) {
      this._userService.deleteUser(this.currentSubUser.userId).subscribe({
        next: (res: ResponseModel) => {
          if (res.response) {
            this.notifyService.showSuccess(res.message, '');
            this.refreshPage();
          } else {
            this.notifyService.showError(res.message, '');
          }
        },
        error: (error) => {
          console.log(error);
          this.notifyService.showError(error, '');
        },
      });
      
    }
  }

  changeActivateStatus(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  changeUserActivateStatus(isTrue: boolean) {
    let subUser = this.subUserDisplayList.find(
      (_) => _.userId == this.currentSubUser.userId
    );
    if (subUser && isTrue) {
      if (this.currentSubUser.isActive) {
        this._userService.deactivateUser(subUser.userId).subscribe({
          next: (res: ResponseModel) => {
            if (res.response && subUser) {
              subUser.isActive = !this.currentSubUser.isActive;
              this.notifyService.showSuccess(res.message, '');
              this.refreshPage();
            } else {
              this.notifyService.showError(res.message, '');
            }
          },
          error: (error) => {
            console.log(error);
            this.notifyService.showError(error, '');
          },
        });
      } else {
        this._userService.activateUser(subUser.userId).subscribe({
          next: (res: ResponseModel) => {
            if (res.response && subUser) {
              subUser.isActive = !this.currentSubUser.isActive;
              this.notifyService.showSuccess(res.message, '');
              this.refreshPage();
            } else {
              this.notifyService.showError(res.message, '');
            }
          },
          error: (error) => {
            console.log(error);
            this.notifyService.showError(error, '');
          },
        });
      }
    } else {
      this.notifyService.showError('Unable to find the user!!', '');
    }
  }

  isUserAdded(isTrue: boolean, isUserAdded: boolean) {
    if (isUserAdded) {
      if (isTrue) {
        this.notifyService.showSuccess('User added successfully !!', '');
      } else {
        this.notifyService.showError('Unable to add the user', '');
      }
    } else {
      if (isTrue) {
        this.notifyService.showSuccess('User updated successfully !!', '');
      } else {
        this.notifyService.showError('Unable to update the user', '');
      }
    }
  }

 

  refreshGrid() {
    this.subUserDisplayList.sort((a, b) => (a.id < b.id ? 1 : -1));
    this.subUserDisplayList = this.subUserList
      .map((subUser) => ({ subUser, ...subUser }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  refreshSearch() {
    this.collectionSize = this.subUserDisplayList.length;
    this.subUserDisplayList.sort((a, b) => (a.id < b.id ? 1 : -1));
    this.subUserDisplayList = this.subUserDisplayList
      .map((subUser) => ({ subUser, ...subUser }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  refreshPage() {
    setTimeout(() => {
    this.userId = parseInt(sessionStorage.getItem('userId')!);
    this._userService.getUserByUserId(this.userId).subscribe({
      next: (res: User) => {
        this.user = res;
        this.subUserList = res.subUsers;
        this.currentSubUser = res.subUsers[0];
        this.subUserDisplayList = this.subUserList;
        this.collectionSize = this.subUserList.length;
        this.refreshGrid();
      },
      error(err) {},
    });
  }, 1000);
    
    
  }

  isCompleted(res: any): void {
    if (res.response) {
      this.notifyService.showSuccess(res.message, '');
      this.refreshPage();
    } else {
      this.notifyService.showError(res.message, '');
    }
  }
}
