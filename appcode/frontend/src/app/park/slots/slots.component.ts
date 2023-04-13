import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  slots! : boolean[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.slots = [true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false];
  }
  goBack(){
    this.router.navigate(['parking']);
  }

  slotInfo(a: number){
    console.log(a)
  }


}

