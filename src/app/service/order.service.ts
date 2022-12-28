import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlPartner: string = "order"
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

  getBillStatus(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"GetBillStatus"}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }

  getPaymentMethos(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"GetPaymentMethos"}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  createNewBill(data: any): Observable<any> {
    return this.httpClient.post(this.createCompleteRoute(this.urlPartner, environment.urlAddress), data,
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  GetAllBill(): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  getBillById(id: any): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  DeleteBill(id: any): Observable<any> {
    return this.httpClient.delete(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress),
      { headers: this.headers }).pipe(catchError(this.handleError));
  }
  UpdateBill(id: any, data: any): Observable<any> {
    return this.httpClient.put(this.createCompleteRoute(`${this.urlPartner}/${id}`, environment.urlAddress),
      data, { headers: this.headers }).pipe(catchError(this.handleError));
  }
  // SearchByKeyword(startDate:any, endDate:any, keyword: any): Observable<any> {
  //   return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"Keyword"}/?todate=${startDate}?fromdate=${endDate}?keyword=${keyword}`,
  //   environment.urlAddress),{ headers: this.headers }).pipe(catchError(this.handleError));
  // }
  SearchByKeyword(startDate:any, endDate:any, keyword: any): Observable<any> {
    return this.httpClient.get(this.createCompleteRoute(`${this.urlPartner}/${"Keyword"}/?startDate=${startDate}&&endDate=${endDate}&&keyword=${keyword}`,
    environment.urlAddress),{ headers: this.headers }).pipe(catchError(this.handleError));
  }


}
