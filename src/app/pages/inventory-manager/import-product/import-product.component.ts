import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.scss']
})
export class ImportProductComponent implements OnInit {

  store : any;
  idStore : any;
  productImport: any;
  constructor(private storeService : StoreService,
    private router : Router,
    private activeRoute :ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idStore = this.activeRoute.snapshot.paramMap.get('id')?.toString();
    this.storeService.getStoreDetails(this.idStore).subscribe(res=>{
      this.store = res;
    })

  }

}
