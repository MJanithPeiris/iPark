import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { RevenueService } from 'src/app/services/revenue.service';
import { RevenueResponse } from 'src/app/data-model/Revenue';

@Component({
  selector: 'app-company-revenue',
  templateUrl: './company-revenue.component.html',
  styleUrls: ['./company-revenue.component.scss'],
})
export class CompanyRevenueComponent implements OnInit {
  subUserDisplayList!: RevenueResponse[];

  userFilter = new FormControl('', { nonNullable: true });

  selectedIndex = 0;

  inputForm!: FormGroup;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;

  constructor(
    private location: Location,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private revenueService: RevenueService
  ) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getToday();
    this.loadData();
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  slotInfo(a: number) {
    console.log(a);
  }

  setId(id: number) {
    this.selectedIndex = id;
  }

  // onDateSelection(date: NgbDate) {
  // this._isTransactionLog = true;
  // this._isOriginalFile = false;
  // this.selectedIndex = 0;
  // if (!this.fromDate && !this.toDate) {
  // 	this.fromDate = date;
  // } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
  // 	this.toDate = date;
  // } else {
  // 	this.toDate = null;
  // 	this.fromDate = date;
  // }
  // if(this.inputForm.value.status != "Select status"){
  // 	this.displayList = this.searchBy(this.inputForm.value.status, this.inputForm.value.company, true, false);
  // }else if(this.inputForm.value.company != "Select company"){
  // 	this.displayList = this.searchBy(this.inputForm.value.status, this.inputForm.value.company, false, false);
  // }else{
  // 	this.displayList = this.searchBy(this.inputForm.value.status, this.inputForm.value.company, false, true);
  // }
  // // this.searchList = this.displayList;
  // this.refreshGrid();
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  loadData() {
    if (this.fromDate && this.toDate) {
      const convertedFromDate = new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day + 1,
        -19,
        30
      ).toISOString();
      const convertedToDate = new Date(
        this.toDate.year,
        this.toDate.month - 1,
        this.toDate.day + 1,
        5,
        29,
        59
      ).toISOString();

      const parentId = parseInt(sessionStorage.getItem('userId')!);
      this.revenueService
        .getRevenueByParentId(parentId, {
          fromDate: convertedFromDate,
          toDate: convertedToDate,
        })
        .subscribe({
          next: (res: RevenueResponse[]) => {
            this.subUserDisplayList = res;
          },
          error(err) {},
        });
    }
  }
}
