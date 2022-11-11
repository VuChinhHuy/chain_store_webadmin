import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StoreService} from '../../service/store.service';
import {StaffService} from '../../service/staff.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray,FormBuilder } from '@angular/forms';
import { TimeShift } from 'src/app/models/timeshift.model';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  constructor(private acivteRoute: ActivatedRoute, private storeService:StoreService,
    private staffService: StaffService,
    private router: Router,

     ) { }

  idStore :string |undefined;
  store : any;
  manager: any;
  arrayStaff: any;
  ismanger :boolean = false;
  timeWork : any;
  timeShift: TimeShift | undefined;
  timeWorkForm :FormGroup | any;
  timeShiftForm : FormGroup | any;
  timestart = [{hour: 0, minute: 0},{hour: 0, minute: 0},{hour: 0, minute: 0}];
  timeend = [{hour: 13, minute: 30},{hour: 13, minute: 30},{hour: 13, minute: 30}];

  ngOnInit(): void {
    this.timeShiftForm = new FormGroup ({
      timestart: new FormControl(),
      timeend: new FormControl()
    });
    this.timeWorkForm = new FormGroup({
      timeshift: new FormArray([
        this.timeShiftForm,
        this.timeShiftForm,
        this.timeShiftForm
      ])


    });
    this.idStore = this.acivteRoute.snapshot.paramMap.get("id")?.toString();
    this.storeService.getStoreDetails(this.idStore as string)
    .subscribe(
      { next: (res: any)=>{
        this.store = res;
        this.staffService.getStaffWithId(res.manager).subscribe({
          next : (data:any)=>{
            this.manager = data;
            this.ismanger = true;
          },
          error:(err: HttpErrorResponse)=>{
            this.ismanger = false;
            console.log(err);

          }
        });
      },
      error:(err: HttpErrorResponse)=>{
        console.log(err);

      }
    });
    this.staffService.getStaff(this.idStore as string).subscribe(data=>this.arrayStaff= data);



  }
  clickChooseStaff(idStaff: string)
  {
    this.router.navigate(["chain-store/detail/",this.idStore,idStaff]);
  }

  deleteStaff(id:string)
  {

  }

  saveTimeWork = (timeWorkForm : any )=>{
    const timeWork ={...timeWorkForm};
    console.log(timeWork);
  }

}
