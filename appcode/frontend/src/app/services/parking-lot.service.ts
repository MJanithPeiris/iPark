import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../data-model/User';
import { Observable } from 'rxjs';
import { ParkingLot, Slot } from '../data-model/ParkingSlot';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  url = 'http://localhost:4000/';
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient) { }

  getParkingInfo(userId: number): Observable<ParkingLot>{
    return this.httpClient.get<ParkingLot>(this.url + 'api/parkinglot/' + userId, {headers: this.headers});
  }

  updateParkingSlot(model: any): Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.url + 'api/parkinglot', model, {headers: this.headers});
  }

  updateParkingSlotStatus(userId : number, slot: Slot): Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.url + 'api/parkinglot/' + userId + "/slotstatus", slot, {headers: this.headers});
  }
}
