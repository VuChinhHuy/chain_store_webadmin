import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
    constructor(private httpClient: HttpClient) { }
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
    // Get ALL Store
    getStore()
    {
      return this.httpClient.get(this.createCompleteRoute("store",environment.urlAddress),{headers: this.headers});

    }



    public getCoordinates(address :string)
    {
      // var url = 'https://nominatim.openstreetmap.org/search?q='+encodeURIComponent(address)+'&format=geojson';

      // this.httpClient.get<any>(url).subscribe(data=>{
      //   var fut = data.features;
      //   console.log(fut);
      //   return fut[0].geometry.coordinates;
      // })
      // var url = "https://www.google.com/maps/place"+ encodeURIComponent(address)
      // this.httpClient.get(url).subscribe(data=>{
      //   console.log(data);
      // })
    }
  getStoreDetails(id:string)
  {
    return this.httpClient.get(this.createCompleteRoute("store/"+id as string,environment.urlAddress),{headers: this.headers});

  }
  addStore(body: any)
  {
    return this.httpClient.post(this.createCompleteRoute("store",environment.urlAddress), body,{headers: this.headers});
  }


}
