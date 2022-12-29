import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportInventoryService } from 'src/app/service/import-inventory.service';
import { ExportExcelService } from 'src/app/service/exportexcel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  store : any;
  idStore: any;
  product : any =[];
  constructor(
    private storeService : StoreService,
    private router : Router,
    private importService : ImportInventoryService,
    private activeRoute :ActivatedRoute,
    private exportExcelService : ExportExcelService,
    private datepipe : DatePipe,
  ) { }

  ngOnInit(): void {
    this.idStore = this.activeRoute.snapshot.paramMap.get('id')?.toString();
    this.storeService.getStoreDetails(this.idStore).subscribe(res=>{
      this.store = res;
    })
    this.getProductInStore();

  }
  // Get Product in store
  getProductInStore()
  {
    this.importService.getProducInStore(this.idStore).subscribe(
      (data : any)=> {
        data.productInStore.forEach((item:any, i:number)=>{
          this.product.push({
            "sanpham" : item,
            "countReal" : ""
          })
        });
        console.log(this.product);

      },
      err =>{

      }
    );
  }
  updateCountReal()
  {
    var check = true;
    this.product.forEach((ob : any) =>{
      if(ob.countReal ==="")
       check = false;
    });
    if(check){
      this.exportExcel();
      const product : any =[];
      this.product.forEach((ob : any,i :number) =>{
      product.push({
        "product" : ob.sanpham.product,
        "count" : ob.countReal,
      })
    });
    console.log({
        "idStore" : this.idStore,
        "productInStore" : product
      });
      this.importService.updateInventManager(this.idStore, {
        idStore : this.idStore,
        productInStore : product
      } ).toPromise();
      this.product =[];
      this.getProductInStore();
    }
  }
  exportExcel()
  {
    const product : any =[];
    this.product.forEach((ob : any,i :number) =>{
      product.push({
        "STT": (i+1),
        "Sản phẩm" : ob.sanpham.product.name,
        "Số lượng" : ob.sanpham.count,
        "Số lượng thực" : ob.countReal,
        "Ghi chú" : ob.sanpham.count != ob.countReal ? "Sai số lượng" :""
      })
    });
    this.exportExcelService.exportImportInventoryExcel(product,"Kiểm kho","Phiếu kiểm kho", this.datepipe.transform(new Date(),'dd-MM-yyyy') as string);

  }
}
