import { Component, OnInit } from '@angular/core';
import { SubUser, User } from '../data-model/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  user: User = {id: 2, name: "Iresh Peiris", isActive : true, email : "janith12peiris@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
 
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 2, name: "Tha Peiris", isActive : false , location : "Moratuwa", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 3, name: "Malith Peiris", isActive : false , location : "ambalangoda", slotCount : "20", email : "exampasdfaszhj12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 4, name: "Re Peiris", isActive : false , location : "kosgoda", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 5, name: "Pre Peiris", isActive : true , location : "panduwas", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
    
      {id : 6, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 7, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 8, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 9, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
      {id : 10, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
      {id : 11, name: "Janith Perera", isActive : true , location : "Panadura", slotCount : "30", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 12, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 13, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 14, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 15, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 16, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@sgmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 17, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 18, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 19, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
  ]};
  subUsers : SubUser[] = this.user.subUsers;

  currentSubUser! : SubUser;
  subUserList! : SubUser[];
  subUserDisplayList = this.subUserList;

  userfilter = new FormControl('', { nonNullable: true });

  selectedIndex = 0;

  popupString = 'Deactivate';
  isUser! : boolean;

  collectionSize! : number;
  page = 1;
  pageSize = 6;

  constructor(private modalService: NgbModal, private notifyService : NotificationService) { }

  ngOnInit(): void {

    this.subUserList = this.subUsers;
    this.subUserDisplayList = this.subUsers;
    this.collectionSize = this.subUsers.length;
    this.refreshGrid();
  }

  select(){

  }

  usersearch(text: string): SubUser[] {
		return this.subUserList.filter((item) => {
			const term = text.toLowerCase();
			if (item && item.name && item.location && item.contactNumber) {
				return (
					// item.id.toString().includes(term) ||
					item.name.toLowerCase().includes(term) ||
					item.location.toLowerCase().includes(term) ||
          item.contactNumber.toLowerCase().includes(term)
          
				);
			}
			else {
				return [];
			}
		});
	}

  onSearchChange(text: string) {
    this.subUserDisplayList = this.usersearch(text);    
    if(text === ''){
      this.page = this.page;
      this.refreshGrid();
    }else{
      this.refreshSearch();
    }
}


  setId(id: number, a :SubUser) {
		this.selectedIndex = id;
    this.currentSubUser = a;
	}

  companyOptionSelect(){
    console.log('company option')
  }

  openForm(content: any, _isNewToDo : boolean){
    this.modalService.open(content);
  }

  setPopup(subUser: any, isUser : boolean){
    this.isUser = isUser;
    this.currentSubUser = subUser;
    if(subUser.isActive){
      this.popupString = 'Deactivate';
    }else{
      this.popupString = 'Activate'
    }
  }

  edit(content : any){
    this.modalService.open(content);
  }

  deleteUser(content : any){
    this.modalService.open(content , { size: 'sm' });
  }

  changeActivateStatus(content : any){
    this.modalService.open(content, { size: 'sm' });
  }

  changeUserActivateStatus(isTrue : boolean){
    let d = this.subUsers.find(_=>_.id == this.currentSubUser.id);
    if(d && isTrue){
      d.isActive =!d.isActive;
      let s = d.isActive ? 'activated' : 'deactivated';
      this.notifyService.showSuccess('User '+s+' successfully!!', '');
    }else{
      this.notifyService.showError('Unable to delete the user', '');
    }
    this.subUserDisplayList = this.subUsers;
    this.refreshGrid();
  }

  isUserAdded(isTrue: boolean, isUserAdded: boolean){
    if(isUserAdded){
      if(isTrue){
        this.notifyService.showSuccess("User added successfully !!", "");
      }else{
        this.notifyService.showError("Unable to add the user", "");
      }
    }else{
      if(isTrue){
        this.notifyService.showSuccess("User updated successfully !!", "");
      }else{
        this.notifyService.showError("Unable to update the user", "");
      }
    }
    
  }

  isToComplete(isTrue: boolean){
    if(isTrue){
      this.notifyService.showSuccess("User deleted successfully !!", "");
    }else{
      this.notifyService.showError("Unable to delete the user", "");
    }
  }

  refreshGrid() {
    this.subUserDisplayList.sort((a,b) => (a.id < b.id)? 1 : -1);
		this.subUserDisplayList = this.subUserList.map((subUser) => ({ subUser, ...subUser })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  refreshSearch(){
    this.collectionSize = this.subUserDisplayList.length;
    this.subUserDisplayList.sort((a,b) => (a.id < b.id)? 1 : -1);
		this.subUserDisplayList = this.subUserDisplayList.map((subUser) => ({ subUser, ...subUser })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

}
