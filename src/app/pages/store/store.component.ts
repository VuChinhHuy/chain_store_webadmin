import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  stores : any;
  constructor(private service: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.service.getStore()
      .subscribe(respont =>{
        this.stores = respont;


      })
  }
  clickStore(id: string )
  {
    this.router.navigate(["chain-store/detail",id]);
  }

}
