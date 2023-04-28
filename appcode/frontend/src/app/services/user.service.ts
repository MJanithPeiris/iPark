import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel, UserRequest } from '../data-model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:4000/';
  headers!: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
   }

  addUser(userRequest : UserRequest): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/user', userRequest, {headers: this.headers});
  }

  getUsers(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'api/user', {headers: this.headers});
  }

  getUserByUserId(userId : number): Observable<any>{
    return this.httpClient.get<any>(this.url + 'api/user/'+ userId, {headers: this.headers});
  }

  getUserByParentId(parentId: number): Observable<any>{
    return this.httpClient.get<any>(this.url + 'api/user/subusers/' + parentId, {headers: this.headers});
  }

  updateUser(model: any): Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.url + 'api/user', model, {headers: this.headers});
  }

  deleteUser(userId : number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.url + 'api/user/' + userId, {headers: this.headers});
  }

  activateUser(userId : number): Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.url + 'api/user/' + userId + "/activate", null, {headers: this.headers});
  }

  deactivateUser(userId : number): Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.url + 'api/user/' + userId + "/deactivate", null, {headers: this.headers});
  }
  
}
