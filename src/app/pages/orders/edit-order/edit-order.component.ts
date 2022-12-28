import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { StaffService } from 'src/app/service/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';



@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  message: any;
  currentOrderDetail: any;
  currentMessage = "false";
  BillStatus: any;
  getBStatus: any;
  PaymentMethos: any;
  getPMethos: any;
  PMethos = null;
  BStatus = null;

  AllProduct: any;
  //
  productItem: any;
  productName: any;
  priceSelect: any;
  categorySelect: any;
  total: any;
  previsional: any;
  keyword = "name";
  countNum: any;
  countIndex: any;
  countValue: any;
  productImport: any = [];
  accountid: any;

  date: any;

  constructor(private orderService: OrderService, private productService: ProductService,private location: Location,
    private staffService: StaffService, private route: ActivatedRoute,private toastrService: ToastrService
  ) {
    //var myDate = this.datepipe.transform((new Date(new Date().setSeconds(0,0)).toISOString()));
  }

  ngOnInit(): void {
    this.message = "";
    this.productService.getAllProduct().subscribe(data => this.AllProduct = data);
    this.getBillDetailById();

  }

  async getBillDetailById() {
    var BSgoing = true, PMGoing = true;
    var BSOrder: any = [], PMOrder: any = [];

    this.currentOrderDetail = await this.orderService.getBillById(this.route.snapshot.paramMap.get('id')).toPromise();
    this.getBStatus = await this.orderService.getBillStatus().toPromise();
    this.getPMethos = await this.orderService.getPaymentMethos().toPromise();

    var BSOrder = this.getBStatus;
    BSOrder.forEach((BSDetail: any) => {
      if (BSgoing == true)
        if (this.currentOrderDetail.billStatus == BSDetail.value) {
          this.currentOrderDetail.billStatus = BSDetail;
          BSgoing = false;
        }
    });
    PMOrder = this.getPMethos;
    PMOrder.forEach((PMDetail: any) => {
      if (PMGoing == true)
        if (this.currentOrderDetail.paymentMethos == PMDetail.value) {
          this.currentOrderDetail.paymentMethos = PMDetail;
          PMGoing = false;
        }
    });
    this.getBillStatus();
    this.getPaymentMethos();
    this.getProductOrder();
  }

  selectedPaymentMethos(e: any) {
    this.PMethos = e;
    console.log(this.PMethos);
  }
  selectedBillStatus(e: any) {
    this.BStatus = e;
    console.log(this.BStatus);
  }
  selectProduct(e: any) {
    this.productItem = e;
    this.productName = e.name;
  }
  inputClearedProduct(e: any) {
    this.productItem = null;
  }
  getProductOrder(): void {
    var arrProduct: any = [], sum = 0;
    arrProduct = this.currentOrderDetail.orderDetails;
    arrProduct.forEach((item: any) => {
      this.total = Number(item.count) * Number(item.product.price);
      this.productImport.push({
        orderProductDetails: item,
        total: this.total
      });
      sum += this.total;
    });
    this.previsional = sum;
  }

  trackByFn(item:any, obj:any){
    return obj
  }
  changeCount(cou: any, countValue: any) {
    console.log(cou, countValue);
    this.countIndex = Number(cou);
    this.countValue = Number(countValue);
    this.eventButtonAdd();
  }

  eventButtonAdd() {
    this.message = "";
    var sum = 0, productExists: any = [];

    productExists = this.productItem;
    if (productExists == null) {
      this.productImport[this.countIndex].orderProductDetails.count = Number(this.countValue);
      this.productImport[this.countIndex].total = Number(this.countValue) * Number(this.productImport[this.countIndex].orderProductDetails.product.price);
    }
    else {
      var isPresent = this.productImport.some(function (el: any) { return el.orderProductDetails.product.id == productExists.id });

      if (isPresent == false) {
        this.total = Number(this.countNum) * Number(this.productItem.price);
        this.productImport.push({ orderProductDetails: { product: this.productItem, count: this.countNum }, total: this.total });
      }
      else {
        console.log(this.productImport);
        this.productImport.map((val: any) => {
          if (val.orderProductDetails.product.id == productExists.id) {
            var newCount = Number(val.orderProductDetails.count) + Number(this.countNum);
            this.total = Number(newCount) * Number(val.orderProductDetails.product.price);
            val.orderProductDetails.count = newCount;
            val.total = this.total;
          }
        });
      }
    }
    this.productImport.forEach(function (value: any) {
      sum += value.total;
    });
    this.previsional = sum;
  }
  removeProduct(i: number) {
    var sum = 0, arrlength: any = [];
    arrlength = this.productImport;
    if ((arrlength.length - 1) > 0) {
      this.productImport.splice(i, 1);
      console.log(this.productImport);
      if (this.productImport.length == 0) {
        this.productImport = null;
      }
      this.productImport.forEach(function (value: any) {
        sum += value.total;
      });
      this.previsional = sum;
    }
  }

  getBillStatus(): void {
    var keepgoing = true;
    var data: any = [], BStatus: any = [];
    BStatus = this.currentOrderDetail.billStatus;
    data = this.getBStatus;
    data.forEach(function (item: any, i: any) {
      if (item.value == BStatus.value && item.name == BStatus.name) {
        data.splice(i, 1);
        data.unshift(item);
      }
    });
    this.BillStatus = data;
  }
  getPaymentMethos(): void {
    var data: any = [], PMtatus: any = [];
    PMtatus = this.currentOrderDetail.paymentMethos;
    data = this.getPMethos;
    data.forEach(function (item: any, i: any) {
      if (item.value == PMtatus.value && item.name == PMtatus.name) {
        data.splice(i, 1);
        data.unshift(item);
      }
    });
    this.PaymentMethos = data;
  }

  updateBill(): void {
    var oPDetails: any = [], PMethos = this.PMethos, BStatus = this.BStatus;
    this.productImport.forEach((val: any) => {
      oPDetails.push({ product: val.orderProductDetails.product, count: val.orderProductDetails.count });
    });
    if (PMethos == null) {
      PMethos = this.currentOrderDetail.paymentMethos.value;
    }
    if (BStatus == null) {
      BStatus = this.currentOrderDetail.billStatus.value;
    }

    this.date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

    const data = {
      OrderDate: this.currentOrderDetail.orderDate,
      LastEditDate: this.date,
      OrderStaff:
        this.currentOrderDetail.orderStaff,
      customer: this.currentOrderDetail.customer,
      BillStatus: Number(BStatus),
      PaymentMethos: Number(PMethos),
      OrderDetails:
        oPDetails,
      TotalRecord: this.previsional.toString()
    };
    console.log(data);
    this.orderService.UpdateBill(this.currentOrderDetail.id, data)
      .subscribe(
        response => {
          console.log(response);
          console.log("cập nhật thành công");
          this.toastrService.success("Cập nhật hoá đơn thành công");
          this.location.back()
        },
        error => {
          console.log(error);
          this.toastrService.error("Cập nhật không thành công");
        });
  }

}

