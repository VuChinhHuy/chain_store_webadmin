import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportInventoryService } from 'src/app/service/import-inventory.service';

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
}
