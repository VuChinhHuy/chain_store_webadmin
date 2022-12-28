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

    getTimeWork( idStore:string)
    {
      return this.httpClient.get(this.createCompleteRoute("timework",environment.urlAddress),
      {headers: this.headers,
      params: {idStore: idStore}}
      );
    }

    updateTimeWork(idStore: string,body:any)
    {
      return this.httpClient.put(this.createCompleteRoute("timework/"+idStore,environment.urlAddress), body,{headers: this.headers});

    }
    createTimeWork(body: any)
    {
      return this.httpClient.post(this.createCompleteRoute("timework",environment.urlAddress), body,{headers: this.headers});
    }

    getCalendarTimeWork(idStore: string)
    {
      return this.httpClient.get(this.createCompleteRoute("calendarwork/calanderinweek/"+ idStore, environment.urlAddress),{headers: this.headers});
    }


}
