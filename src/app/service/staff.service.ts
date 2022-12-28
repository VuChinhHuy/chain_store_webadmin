import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  urlPartner: string = "staff"

  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
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

  UpdateStaffAsync(id: any, data: any): Observable<any> {
    return this.httpClient.put(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress), data,
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  RemoveStaffAsync(id: any): Observable<any> {
    return this.httpClient.delete(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  getStaffbyId(id: any): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }

}
