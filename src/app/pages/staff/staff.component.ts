import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';
import {AddressService} from '../../service/address.service';
import { StaffService } from 'src/app/service/staff.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff : any;
  constructor(private staffService: StaffService,private router: Router) { }

  ngOnInit(): void {
    this.staffService.getStaff

  }


}
