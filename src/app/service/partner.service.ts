import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  urlPartner : string = "partner"
  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  getAllPartner()
  {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner,environment.urlAddress),{headers: this.headers});
      
  }
  addPartner(body: any)
  {
    return this.httpClient.post(this.createCompleteRoute(this.urlPartner,environment.urlAddress), body,{headers: this.headers});
  }
  deletePartner(id:string){
    return this.httpClient.delete(this.createCompleteRoute(this.urlPartner+"/" +id,environment.urlAddress),{headers: this.headers});
  }
}
