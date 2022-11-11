import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

    private url : string = "https://provinces.open-api.vn/api/";
    constructor(private httpClient: HttpClient) { }

    getProvinces()
    {
      
      return this.httpClient.get(this.url+"/p");
        
    }
    getDistricts(){
      return  this.httpClient.get(this.url+'/d');

    }
    getWard(){
        return this.httpClient.get(this.url+'/w');
 
     }
}
