import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SubUser, User } from "../data-model/User";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

   users : User[] = [
    {id: 1, name: "Test Customer", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "SuperAdmin", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 2, name: "Tha Peiris", isActive : false , location : "Moratuwa", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 3, name: "Malith Peiris", isActive : true , location : "ambalangoda", slotCount : "20", email : "exampasdfaszhj12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 4, name: "Re Peiris", isActive : false , location : "kosgoda", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 5, name: "Pre Peiris", isActive : true , location : "panduwas", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"}
    ]},
    {id: 2, name: "test 2", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 2, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 3, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
    ]},
    {id: 3, name: "test 3", isActive : false, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "SuperAdmin", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
      {id : 2, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
    ]},
    {id: 4, name: "test 4", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Perera", isActive : true , location : "Panadura", slotCount : "30", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 2, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 3, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 4, name: "iresh", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 5, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 6, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@sgmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 7, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 8, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 9, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
    ]},
    {id: 5, name: "test 5", isActive : false, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: []}
  ];

  currentUser! : User;
  currentSubUser! : SubUser;

  subUserList! : SubUser[];
  subUserDisplayList = this.subUserList;

  displayUserList = this.users;

  userfilter = new FormControl('', { nonNullable: true });
  companyfilter = new FormControl('', { nonNullable: true });

  userSelectedIndex = 0;
  subUserSelectedIndex = 0;

  popupString = 'Deactivate';
  isUser! : boolean;

  collectionSize! : number;
  page = 1;
  pageSize = 6;

  constructor(private modalService: NgbModal, private notifyService : NotificationService) { }

  ngOnInit(): void {

    this.currentUser = this.users[0];
    this.subUserList = this.currentUser.subUsers
    this.subUserDisplayList = this.currentUser.subUsers;
    this.collectionSize = this.subUserList.length;
    this.refreshGrid();
  }

  test(s : any){
    let d = this.users.find(_=>_.id == s.id);
    if(d && d.isActive){
      d.isActive = false;
    }else if(d){
      d.isActive = true;
    }
  }

  select(){

  }

  isSuperAdmin(userRole: string) : boolean{
    if(userRole.toLowerCase() == 'superadmin'){
      return true;
    }
    return false;
  }

  usersearch(text: string) {
		return this.subUserList.filter((item) => {
			const term = text.toLowerCase();
			if (item && item.name && item.location && item.contactNumber) {
				return (
					// item.id.toString().includes(term) ||
					item.name.toLowerCase().includes(term) ||
					item.location.toLowerCase().includes(term)||
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


companySearch(text: string){
  return this.users.filter((item) => {
    const term = text.toLowerCase();
    if (item && item.name) {
      return (
        // item.id.toString().includes(term) ||
        item.name.toLowerCase().includes(term)
      );
    }
    else {
      return [];
    }
  });
}

onSearchChang(text: string) {
  this.displayUserList = this.companySearch(text);
}

  setId(id: number, a :User) {
		this.userSelectedIndex = id;
    this.currentUser = a;
    this.subUserList = a.subUsers;
    this.subUserDisplayList = a.subUsers;
    this.collectionSize = a.subUsers.length;
    this.refreshGrid();
	}

  setSubUser(id: number, a:SubUser){
    this.subUserSelectedIndex = id;
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
    if(this.isUser){
      let d = this.users.find(_=>_.id == this.currentUser.id);
      if(d && isTrue){
        d.isActive =!this.currentUser.isActive;
        let s = d.isActive ? 'activated' : 'deactivated';
        this.notifyService.showSuccess('User '+s+' successfully!!', '');
      }else{
        this.notifyService.showError('Unable to delete the user', '');
      }
    }else{
      let d = this.subUserDisplayList.find(_=>_.id == this.currentSubUser.id);
      if(d && isTrue){
        console.log(d.isActive)
        d.isActive =!this.currentSubUser.isActive;
        console.log(d.isActive)
        let s = d.isActive? 'activated' : 'deactivated';
        this.notifyService.showSuccess('Subuser '+s+' successfully!!', '');
      }else{
        this.notifyService.showError('Unable to delete the user', '');
      }
    }
    
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
