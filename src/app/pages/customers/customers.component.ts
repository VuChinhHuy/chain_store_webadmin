import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customer: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }
  getAllCustomer(): void{
    this.customerService.getAllCustomer()
    .subscribe(
      (customers:any) =>{
        this.customer = customers;
      },
      (error:any)=>{
        console.log(error);
      });
  }
  deleteCustomer(id:string){
    this.customerService.DeleteCustomer(id)
    .subscribe(
      response => {
        this.getAllCustomer();
      },
      error => {
        console.log(error);
      });
  }

}
