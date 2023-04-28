import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel, User } from '../data-model/User';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { ParkingLot } from '../data-model/ParkingSlot';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss'],
})
export class SuperadminComponent implements OnInit {
  users!: User[];
  displayUserList!: User[];

  subUserList!: User[];
  subUserDisplayList!: User[];

  currentUser: User = {
    userId: 1,
    name: 'default user name',
    email: 'default',
    contactNumber: 'default',
    isActive: true,
    isDeleted: false,
    userRole: 'default',
    id: 0,
    parentId: 0,
    parkingLot: new ParkingLot(),
    accessToken: '',
    subUsers: [],
  };
  currentSubUser!: User;

  userFilter = new FormControl('', { nonNullable: true });
  companyFilter = new FormControl('', { nonNullable: true });

  userSelectedIndex = 0;
  subUserSelectedIndex = 0;

  popupString = 'Deactivate';
  isUser!: boolean;

  collectionSize!: number;
  page = 1;
  pageSize = 6;

  constructor(
    private modalService: NgbModal,
    private notifyService: NotificationService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.refreshPage();
  }

  test(s: any) {
    let d = this.users.find((_) => _.id == s.id);
    if (d && d.isActive) {
      d.isActive = false;
    } else if (d) {
      d.isActive = true;
    }
  }

  select() {}

  isSuperAdmin(userRole?: string): boolean {
    if (userRole?.toLowerCase() == 'superadmin') {
      return true;
    }
    return false;
  }

  userSearch(text: string) {
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

  companySearch(text: string) {
    return this.users.filter((item) => {
      const term = text.toLowerCase();
      if (item && item.name) {
        return (
          // item.id.toString().includes(term) ||
          item.name.toLowerCase().includes(term)
        );
      } else {
        return [];
      }
    });
  }

  onSearchChang(text: string) {
    this.displayUserList = this.companySearch(text);
  }

  setId(id: number, a: User) {
    this.userSelectedIndex = id;
    this.currentUser = a;
    this.subUserList = a.subUsers;
    this.subUserDisplayList = a.subUsers;
    this.collectionSize = a.subUsers.length;
    this.refreshGrid();
  }

  setSubUser(id: number, a: User) {
    this.subUserSelectedIndex = id;
    this.currentSubUser = a;
  }

  companyOptionSelect() {
    console.log('company option');
  }

  openForm(content: any, _isNewToDo: boolean) {
    this.modalService.open(content);
  }

  setPopup(subUser: User, isUser: boolean) {
    this.isUser = isUser;

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

  changeActivateStatus(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  changeUserActivateStatus(isTrue: boolean) {
    if (this.isUser) {
      let user = this.displayUserList.find(
        (_) => _.userId == this.currentUser.userId
      );
      if (user && isTrue) {
        if (this.currentUser.isActive) {
          this._userService.deactivateUser(user.userId).subscribe({
            next: (res: ResponseModel) => {
              if (res.response && user) {
                user.isActive = !this.currentUser.isActive;
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
          this._userService.activateUser(user.userId).subscribe({
            next: (res: ResponseModel) => {
              if (res.response && user) {
                user.isActive = !this.currentUser.isActive;
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
    } else {
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
  }

  deleteUser(isTrue: boolean) {
    if (isTrue) {
      this._userService.deleteUser(this.currentUser.userId).subscribe({
        next: (res: ResponseModel) => {
          console.log(res);
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

  deleteSubUser(isTrue: boolean) {
    if (isTrue) {
      this._userService.deleteUser(this.currentSubUser.userId).subscribe({
        next: (res: ResponseModel) => {
          console.log(res);
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
    this._userService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res.filter(
          (_) =>
            _.userRole != 'Parking' &&
            _.email != sessionStorage.getItem('email')
        );
        this.currentUser = res[0];
        this.subUserList = res[0].subUsers;
        this.currentSubUser = res[0].subUsers[0];
        this.displayUserList = this.users;
        this.subUserDisplayList = this.subUserList;
        this.collectionSize = this.subUserList.length;
        this.refreshGrid();
      },
      error(err) {},
    });
  }

  isCompleted(res: any): void{
    if (res.response) {
      this.notifyService.showSuccess(res.message, '');
      this.refreshPage();
    }else{
      this.notifyService.showError(res.message, '');
    }
  }
}
