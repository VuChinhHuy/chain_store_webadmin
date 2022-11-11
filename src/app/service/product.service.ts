import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlPartner : string = "product"
  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': "Bearer "+ localStorage.getItem("jwt"),

  });
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  getAllProduct()
  {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner,environment.urlAddress),{headers: this.headers});

  }
  getProductWithCategory(idcategory : string, page: any)
  {
    return this.httpClient.get(this.createCompleteRoute(this.urlPartner+"/withcategory/"+idcategory,environment.urlAddress),
            {headers: this.headers,
            params: {page: page}}

    );

  }
  addProduct(body: any)
  {
    return this.httpClient.post(this.createCompleteRoute(this.urlPartner,environment.urlAddress), body,{headers: this.headers});
  }
  deleteProduct(id:string){
    return this.httpClient.delete(this.createCompleteRoute(this.urlPartner+"/" +id,environment.urlAddress),{headers: this.headers});
  }

}
