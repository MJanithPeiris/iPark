import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../data-model/User';
import { Observable } from 'rxjs';
import { RevenueResponse } from '../data-model/Revenue';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  url = 'http://localhost:4000/';
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient) { }

  addRevenue(revenue: any): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/revenue', revenue, {headers: this.headers});
  }

  getRevenue(userId : number): Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.url + 'api/revenue/' + userId, {headers: this.headers});
  }

  getRevenueByParentId(parentId : number, date: any): Observable<RevenueResponse[]>{
    const queryString = Object.keys(date)
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(date[key])}`)
  .join("&");
const s = 'fromDate='+date.fromDate + '&toDate='+date.toDate;

    return this.httpClient.get<RevenueResponse[]>(this.url + 'api/revenue/company/' + parentId +`?${s}`, {headers: this.headers});
  }
}
