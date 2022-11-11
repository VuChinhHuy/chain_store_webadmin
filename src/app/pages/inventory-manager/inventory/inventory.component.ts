import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  store : any;
  idStore: any;
  constructor(
    private storeService : StoreService,
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
