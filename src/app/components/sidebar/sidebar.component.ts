import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/chain-store', title: 'Cửa hàng',  icon:'ni-planet text-blue', class: '' },
  { path: '/products', title: 'Sản phẩm',  icon:'ni-diamond text-yellow', class: '' },
  { path: '/partners', title: 'Đối tác',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/oders', title: 'Hoá đơn',  icon:'ni-bullet-list-67 text-info', class: '' },
  { path: '/customers', title: 'Khách hàng',  icon:'ni-key-25 text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems : any[] = [];

  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
