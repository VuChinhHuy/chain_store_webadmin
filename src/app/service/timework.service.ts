import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TimeWorkService {

  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
    constructor(private httpClient: HttpClient) { }
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }

    getStore()
    {
      return this.httpClient.get(this.createCompleteRoute("store",environment.urlAddress),{headers: this.headers});

    }


}
