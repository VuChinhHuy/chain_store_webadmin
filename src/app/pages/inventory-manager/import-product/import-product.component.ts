import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';
import { ProductService } from 'src/app/service/product.service';
import { ImportInventoryService } from 'src/app/service/import-inventory.service';
import { ExportExcelService } from 'src/app/service/exportexcel.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.scss']
})
export class ImportProductComponent implements OnInit {

  store : any;
  idStore : any;
  productImport: any = [];
  keyword = "name";
  product : any;
  productSelect : any;
  count: any;
  importInvetory : any;
  constructor(private storeService : StoreService,
    private router : Router,
    private activeRoute :ActivatedRoute,
    private productService : ProductService,
    private toastrService: ToastrService,
    private importService : ImportInventoryService,
    private exportExcelService : ExportExcelService,
    private datepipe : DatePipe,
    ) { }

  ngOnInit(): void {
    this.loadProduct();
    this.idStore = this.activeRoute.snapshot.paramMap.get('id')?.toString();
    this.storeService.getStoreDetails(this.idStore).subscribe(res=>{
      this.store = res;
    });
    this.productImport = null;
    this.getImportInventory();
  }

  loadProduct()
  {
    this.productService.getAllProduct().subscribe(data=>this.product = data);
  }
  selectProduct(e: any)
  {
    this.productSelect = e;
  }
  inputClearedProduct(e: any){
    this.productSelect = null;
  }
  eventButtonAdd()
  {
    if(this.productImport == null)
      this.productImport = [];
    if((this.productSelect != null || this.productSelect != undefined) && (this.count != null || this.count != undefined)){
      if(this.productImport.length > 0)
        {
          var i;
          for(var item of this.productImport)
          {
            if(item.product.id === this.productSelect.id)
            {
              i = item;
              break;
            }
          }
          if(i != null || i != undefined){
            if(i.product.id === this.productSelect.id)
            {
              this.productImport[this.productImport.indexOf(item)].count =  this.productImport[this.productImport.indexOf(item)].count + this.count;
            }
          }
          else
          {
            this.productImport.push({product :this.productSelect,count: this.count});
          }
        }
      else
      this.productImport.push({product :this.productSelect,count: this.count});


    }
    else
      this.toastrService.error("Nhập đủ thông tin");
    this.count = null;

  }
  removeProduct(i : number)
  {
    this.productImport.splice(i,1);
    if(this.productImport.length == 0)
    this.productImport = null;
  }
  getImportInventory()
  {
    this.importService.getInventoryStore(this.idStore).subscribe(
      (data : any)=> {
        this.importInvetory = data;
      },
      err =>{

      }
    );

  }
  saveImportInventory()
  {

    const importInventory =
    {
      "idStore": this.idStore,
      "productInventory" : this.productImport,
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": "",
      "create_at": new Date()

    }
    this.importService.createImport(importInventory).subscribe(
      (data)=>{
        this.productImport = null;
        this.toastrService.success("Lưu thành công phiếu nhập!");
        this.getImportInventory();

      },
      err =>{

      }
    )

    console.log(this.productImport);
  }
  exportExcel()
  {
    const product : any =[];
    this.productImport.forEach((ob : any,i :number) =>{
      product.push({
        "STT": (i+1),
        "Sản phẩm" : ob.product.name,
        "Số lượng" : ob.count
      })
    });

    try
    {
      this.saveImportInventory();
      this.exportExcelService.exportImportInventoryExcel(product,"Nhập kho","Phiếu nhập kho", this.datepipe.transform(new Date(),'dd-MM-yyyy') as string);
    }
    catch(e)
    {

    }



  }


}
