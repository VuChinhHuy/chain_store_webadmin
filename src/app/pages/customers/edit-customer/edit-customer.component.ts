import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  currentCustomer: any;
  customer = {
    first_name: '',
    last_name: '',
    birthday: '',
    note: '',
    phone: '',
    address: '',
    update_at: '',
    update_user : '',
  };
  messagefirst_name = '';
  messagelast_name = '';
  messageaddress = '';
  messagebirthday = '';
  messagephone = '';

  constructor(
    private customerServicee: CustomerService,
    private route: ActivatedRoute,
    private datepipe : DatePipe,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.getByIdCustomer(this.route.snapshot.paramMap.get('id'));
  }

  getByIdCustomer(id: string | null): void {
    this.customerServicee.getItemById(id)
      .subscribe(
        (data: any) => {
          this.currentCustomer = data;
          this.customer  ={
            first_name : data.first_name,
            last_name: data.last_name,
            birthday: data.birthday,
            note: data.note,
            phone: data.phone,
            address: data.address,
            update_at : this.datepipe.transform( Date(),"yyyy-MM-dd")!.toString(),
            update_user : localStorage.getItem("username")!
          };
        },
        (error: any) => {
          console.log(error);
        });
  }
  updateCustomer(): void {
    this.currentCustomer.update_user = localStorage.getItem('username')?.toString();
    this.currentCustomer.update_at = new Date();
    if(this.currentCustomer.first_name.toString() != this.customer.first_name.toString()
       || this.currentCustomer.last_name.toString() != this.customer.last_name.toString()
        || this.currentCustomer.phone.toString() != this.customer.phone.toString()
       || this.currentCustomer.birthday.toString() != this.customer.birthday.toString()
       || this.currentCustomer.address.toString() != this.customer.address.toString()  )
    {
      if(this.currentCustomer.first_name.toString() != this.customer.first_name.toString())
      {
        this.currentCustomer.note = this.currentCustomer.note + " ,Chỉnh sửa họ"
      }
      if(this.currentCustomer.last_name.toString() != this.customer.last_name.toString())
      {
        this.currentCustomer.note = this.currentCustomer.note + " ,Chỉnh sửa tên"
      }
      if(this.currentCustomer.phone.toString() != this.customer.phone.toString())
      {
        this.currentCustomer.note = this.currentCustomer.note + " ,Chỉnh sửa số điện thoại"
      }
      if(this.currentCustomer.birthday.toString() != this.customer.birthday.toString())
      {
        this.currentCustomer.note = this.currentCustomer.note + " ,Chỉnh sửa ngày sinh"
      }
      if(this.currentCustomer.address.toString() != this.customer.address.toString())
      {
        this.currentCustomer.note = this.currentCustomer.note + " ,Chỉnh sửa địa chỉ"
      }
      console.log(this.currentCustomer)
      this.customerServicee.EditCustomer(this.currentCustomer.id, this.currentCustomer)
      .subscribe(
        response => {
          this.toastrService.success("Chỉnh sửa khách hàng thành công!");

        },
        error => {
          this.toastrService.error("Chỉnh sửa khách hàng thành công!");
          console.log(error);
        });
    }
    else
    this.toastrService.warning("Không chỉnh sửa gì");
  }

}
