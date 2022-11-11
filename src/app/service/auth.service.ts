import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({
    'Content-Type': ['application/json', 'charset=utf-8'],

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public loginUser = (route: string, body: Account) => {
    return this.httpClient.post(this.createCompleteRoute(route, environment.urlAddress), JSON.stringify(body).toString(),{headers: this.headers});
  }
  public addAccount(body:any)
  {
    return this.httpClient.post(this.createCompleteRoute("account",environment.urlAddress), JSON.stringify(body).toString(),{headers: this.headers});
  }
  public deleteAccount(id:string)
  {
    return this.httpClient.delete(this.createCompleteRoute("account/"+id,environment.urlAddress),{headers: this.headers});


  }
}
