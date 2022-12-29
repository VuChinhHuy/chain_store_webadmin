import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

    private url : string = "address";
    constructor(private httpClient: HttpClient) { }
    headers = new HttpHeaders({
      'Content-Type': ['application/json', 'charset=utf-8'],

    });
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
    getProvinces()
    {
      return this.httpClient.get(this.createCompleteRoute(this.url, environment.urlAddress));
    }

}
