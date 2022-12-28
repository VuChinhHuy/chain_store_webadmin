import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public focus = false;
  order: any = [];
  sumCount: any;
  sumProduct: any;
  BillStatus: any = [];
  ArrayValue: any;
  startDate: any = " ";
  endDate: any = " ";
  keyword: any = " ";
  constructor(private orderService: OrderService,private router: Router) { }

  ngOnInit(): void {
    this.changeValueSearchItem();

  }
  changeValueByKeyword(keyword: any) {
    this.changeValueSearchItem();
    this.keyword = keyword;
  }
  changeValueByStartDate(startDate: any) {
    console.log(startDate);
    this.changeValueSearchItem();
    this.startDate = startDate;
  }
  changeValueByEndDate(endDate: any) {
    this.changeValueSearchItem();
    this.endDate = endDate;
  }
  async changeValueSearchItem() {
    this.order = await this.orderService.SearchByKeyword(this.startDate, this.endDate, this.keyword).toPromise();
    this.compareBillStatus();
  }
  async DeleteBill(id: any) {
    this.orderService.DeleteBill(id).subscribe(response => {
      this.changeValueSearchItem();
    });
  }
  async compareBillStatus(){
    this.BillStatus = await this.orderService.getBillStatus().toPromise();
    this.order.forEach((item: any) => {
      this.BillStatus.forEach((value: any) => {
        if (item.billStatus == value.value)
          item.billStatus = value.name;
      }
      );
    });
  }
  clickRow(id: String)
  {
    this.router.navigate(["/OrderDetail/",id]);

  }
}
