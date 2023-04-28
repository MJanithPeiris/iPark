import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../data-model/Auth';
import { ResponseModel } from '../data-model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:4000/';

  constructor(private httpClient: HttpClient) { }

  signIn(credentials: Auth): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/auth/signin', credentials);
  }

  signOut(): Observable<ResponseModel>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    console.log(headers)
    return this.httpClient.post<ResponseModel>(this.url + 'api/auth/signout', null, {headers});
  }

  forgetPassword(credentials: Auth): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/auth/forgetpassword', credentials);
  }

  validateSecurityCode(credentials: Auth): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/auth/validatesecuritycode', credentials);
  }

  resetPassword(credentials: Auth): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + 'api/auth/resetpassword', credentials);
  }

}
