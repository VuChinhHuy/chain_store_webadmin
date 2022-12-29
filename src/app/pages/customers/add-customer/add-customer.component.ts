import { DatePipe } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  messagefirst_name = '';
  messagelast_name = '';
  messageaddress = '';
  messagebirthday = '';
  messagephone = '';
  customer = {
    first_name: '',
    last_name: '',
    birthday: '',
    note: '',
    phone: '',
    address: '',
    create_user: '',
    update_user: '',
    create_at : ""
  };
  isCustomerAdded = false;

  constructor(private customerService: CustomerService,private toastrService: ToastrService,private datepipe : DatePipe,) { }

  ngOnInit(): void {

  }
  createCustomer(): void {
    this.messagefirst_name = '';
    this.messagelast_name = '';
    this.messagebirthday = '';
    this.messagephone = '';
    const data = {
      first_name: this.customer.first_name,
      last_name: this.customer.last_name,
      birthday: this.customer.birthday,
      note: this.customer.note,
      phone: this.customer.phone.toString(),
      address: this.customer.address,
      create_user: localStorage.getItem("username")?.toString(),
      update_user: 'null',
    };
    if (!data.first_name) {
      this.messagefirst_name = 'Họ không được trống!';
      // alert('Please add first_name!');
      return;
    }
    else if (!data.last_name) {
      this.messagelast_name = 'Tên không được trống!';
      //alert('Please add last_name!');
      return;
    }
    else if (!data.birthday) {
      //alert('Please add birthday!');
      this.messagebirthday = 'Ngày sinh không được trống!';
      return;
    }
    else if (!data.phone) {
      //alert('Please add phone!');
      this.messagephone = 'Số điện thoại không được trống!';
      return;
    }
    console.log(data);
    this.customerService.createNewCustomer(data)
      .subscribe(
        response => {
          this.toastrService.success("Thêm mới khách hàng thành công!");
          this.isCustomerAdded = true;
          this.newBook();
        },
        error => {
          this.toastrService.error("Thêm mới khách hàng không thành công!");
          console.log(error);
        });
  }

  // Reset on adding new
  newBook(): void {
    this.isCustomerAdded = false;
    this.customer = {
      first_name: '',
      last_name: '',
      birthday: '',
      note: '',
      phone: '',
      address: '',
      create_user: '',
      update_user: '',
      create_at : this.datepipe.transform( Date(),"yyyy-MM-dd")!.toString()

    };
    this.messagefirst_name = '';
    this.messagelast_name = '';
    this.messageaddress = '';
    this.messagebirthday = '';
    this.messagephone = '';
  }
}
