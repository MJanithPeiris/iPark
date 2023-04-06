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
    {id: 1, name: "Test Customer", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 1, name: "Tha Peiris", isActive : false , location : "Moratuwa", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 1, name: "Malith Peiris", isActive : true , location : "ambalangoda", slotCount : "20", email : "exampasdfaszhj12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 1, name: "Re Peiris", isActive : false , location : "kosgoda", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"},
      {id : 1, name: "Pre Peiris", isActive : true , location : "panduwas", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 1, userRole: "parking"}
    ]},
    {id: 2, name: "test 2", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 2, userRole: "parking"},
    ]},
    {id: 3, name: "test 3", isActive : false, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 3, userRole: "parking"},
    ]},
    {id: 4, name: "test 4", isActive : true, email : "examplzdfe12345678@gmail.com", contactNumber : "0711933120", userRole: "company", subUsers: [
      {id : 1, name: "Janith Perera", isActive : true , location : "Panadura", slotCount : "30", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@sgmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
      {id : 1, name: "Janith Peiris", isActive : true , location : "Panadura", slotCount : "20", email : "example12345678@gmail.com", contactNumber : "0711933120", parentId: 4, userRole: "parking"},
    ]},
  ];

  currentUser! : User;
  currentSubUser! : SubUser;

  subUserList! : SubUser[];
  subUserDisplayList = this.subUserList;

  displayUserList = this.users;

  userfilter = new FormControl('', { nonNullable: true });
  companyfilter = new FormControl('', { nonNullable: true });

  selectedIndex = 0;

  popupString = 'Deactivate';
  isUser! : boolean;

  constructor(private modalService: NgbModal, private notifyService : NotificationService) { }

  ngOnInit(): void {

    this.currentUser = this.users[0];
    this.subUserList = this.currentUser.subUsers
    this.subUserDisplayList = this.currentUser.subUsers;
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

  

  usersearch(text: string) {
		return this.subUserList.filter((item) => {
			const term = text.toLowerCase();
			if (item && item.name && item.location) {
				return (
					item.id.toString().includes(term) ||
					item.name.toLowerCase().includes(term) ||
					item.location.toLowerCase().includes(term)
				);
			}
			else {
				return [];
			}
		});
	}

  onSearchChange(text: string) {
    this.subUserDisplayList = this.usersearch(text);
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
		this.selectedIndex = id;
    this.currentUser = a;
    this.subUserList = a.subUsers;
    this.subUserDisplayList = a.subUsers;
	}

  setSubUser(a:SubUser){
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




}
