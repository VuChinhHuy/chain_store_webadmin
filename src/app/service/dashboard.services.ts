import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlPartner: string = "revenue"
  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders({
    'Authorization': "Bearer " + localStorage.getItem("jwt"),

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
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

  getRevenueByYear(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"RevenueByYear"}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  getRevenueByWeek(startDate:any, endDate:any): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"RevenueByWeek"}/?startDate=${startDate}&&endDate=${endDate}`, 
    environment.urlAddress),{ headers: this.headers }).pipe(catchError(this.handleError));
  }
  GetCalculateLastMonth(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"GetCalculateLastMonth"}`, 
    environment.urlAddress),{ headers: this.headers }).pipe(catchError(this.handleError));
  }
  GetBetSellingProduct(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"GetBetSellingProduct"}`, 
    environment.urlAddress),{ headers: this.headers }).pipe(catchError(this.handleError));
  }
}
