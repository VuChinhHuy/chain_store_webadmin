import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  urlPartner : string = "ImportInventory"
  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  // get
  getInventoryStore(idStore : any)
  {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner,environment.urlAddress)+"/"+idStore as string,{headers: this.headers});

  }
  // Create
  createImport(body: any)
  {
    return this.httpClient.post(this.createCompleteRoute(this.urlPartner,environment.urlAddress), body,{headers: this.headers});

  }
  // get product inventory
  getProducInStore(idStore : any)
  {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner,environment.urlAddress)+"/inventory/"+idStore as string,{headers: this.headers});

  }

}
