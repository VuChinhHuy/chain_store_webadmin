import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CatelogryService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  getAllCategory()
  {
    return this.httpClient.get(this.createCompleteRoute("category",environment.urlAddress),{headers: this.headers});

  }
  addCategory(body: any)
  {
    return this.httpClient.post(this.createCompleteRoute("category",environment.urlAddress), body,{headers: this.headers});
  }
  deleteCategory(id:string){
    return this.httpClient.delete(this.createCompleteRoute("category/"+id,environment.urlAddress),{headers: this.headers});
  }
  getCategory(id: string)
  {
    return this.httpClient.get(this.createCompleteRoute("category/"+id,environment.urlAddress),{headers: this.headers});

  }

}
