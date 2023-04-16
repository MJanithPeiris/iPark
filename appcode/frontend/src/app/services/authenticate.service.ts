import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../data-model/Auth';
import { ResponseModel } from '../data-model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient: HttpClient) { }

  signIn(credentials: Auth): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:4000/api/auth/signin', credentials);
  }

  signOut(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log(headers)
    return this.httpClient.post<any>('http://localhost:4000/api/auth/signout', null, {headers});
  }


}
