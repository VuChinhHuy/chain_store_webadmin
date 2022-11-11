import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
    constructor(private httpClient: HttpClient) { }
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
    getManager()
    {
      return this.httpClient.get(this.createCompleteRoute("staff/manager",environment.urlAddress),{headers: this.headers});

    }
    getStaffWithId(id: string)
    {
      return this.httpClient.get(this.createCompleteRoute("staff/"+ id,environment.urlAddress),{headers: this.headers});
    }
    public addStaff(body:any)
  {
    return this.httpClient.post(this.createCompleteRoute("staff",environment.urlAddress), body,{headers: this.headers});
  }
  public getStaff(idStore: string)
  {
    return this.httpClient.get(this.createCompleteRoute("staff?idstore="+idStore ,environment.urlAddress),{headers: this.headers    });

  }
  public getAllStaffSearch(nameStaff: string, nameStore : string,page: any)
  {

  }


}
