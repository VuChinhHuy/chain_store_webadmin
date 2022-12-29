import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StoreService} from '../../service/store.service';
import {StaffService} from '../../service/staff.service';
import {TimeWorkService} from '../../service/timework.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray,FormBuilder } from '@angular/forms';
import { TimeShift } from 'src/app/models/timeshift.model';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  @ViewChild('closeModal') closebutton: any;
  constructor(private acivteRoute: ActivatedRoute, private storeService:StoreService,
    private staffService: StaffService,
    private router: Router,
    private timeWorkService: TimeWorkService,
    private toastrService: ToastrService,
    private datepipe : DatePipe,
    private accountService : AuthService,
     ) { }

  idStore :string |undefined;
  store : any;
  manager: any;
  arrayStaff: any;
  ismanger :boolean = false;
  timeWork : any;
  timeShift: TimeShift | undefined;
  calendarTimeWork : any = [];
  timeWorkForm :FormGroup | any;

  // date week
  date = new Date();
  Mon : any;
  Tue : any;
  Wed : any;
  Thru : any;
  Fri : any;
  Sat : any;
  Sun : any;
  startdayofweek : any;
  enddayofweek : any;
  dayvie : any;
  datenow : any;

  ngOnInit(): void {

    this.getDayInWeek()

    this.timeWorkForm = new FormGroup({
      timeshift: new FormArray([
        new FormGroup ({
          timestart: new FormControl(),
          timeend: new FormControl()
        }),
        new FormGroup ({
          timestart: new FormControl(),
          timeend: new FormControl()
        }),
        new FormGroup ({
          timestart: new FormControl(),
          timeend: new FormControl()
        })
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
    this.loadTimeWork();
    this.timeWorkService.getCalendarTimeWork(this.idStore as string).subscribe(
      data => this.calendarTimeWork = data
    );

  }
  getCalendarWorkTimeShift(shift : string, dateTime : any): any {
    var result : any = [];
    var calendarDate =  this.calendarTimeWork.filter((x : any)=> this.datepipe.transform(x['time'],'dd/MM/yyyy')== dateTime );
    for(var item of calendarDate)
    {
      for (var time of item.timeshift)
      {
        if(time.timeShift.name === shift)
        {
          result.push(time);
        }
      }

    }
    return result;
  }
  clickChooseStaff(idStaff: string)
  {
    this.router.navigate(["chain-store/detail/",this.idStore,idStaff]);
  }

  deleteStaff(id:string,accountId : string)
  {

    this.accountService.deleteAccount(accountId).subscribe({
      next : (res:any) =>{

        this.staffService.getStaff(this.idStore as string).subscribe(data=>this.arrayStaff= data);

      },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
      }
    });

    this.staffService.RemoveStaffAsync(id).subscribe({
      next : (res:any) =>{

      this.staffService.getStaff(this.idStore as string).subscribe(data=>this.arrayStaff= data);

      },
      error:(err: HttpErrorResponse)=>{
        console.log(err);

      }
    })



  }

  saveTimeWork = (timeWorkForm : any )=>{
    const timeWork ={...timeWorkForm};

    // check value form
    const timeShiftNew: { name: string; timeStart: any; timeEnd: any; }[] = [];

    timeWork.timeshift.forEach((value: any, index: any) =>{

      // check timestart < time end
      // Check null
      if(value.timestart != null && value.timeend != null || value.timestart != undefined && value.timeend != undefined)
      timeShiftNew.push({
        "name": "Ca số "+ (index+1),
        "timeStart": value.timestart,
        "timeEnd" : value.timeend
      });
    });

    const timeWorkNew = {
      "idstore": this.idStore,
      "timeshift": timeShiftNew,
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": ""
    }
    if(this.timeWork == null)
      this.timeWorkService.createTimeWork(timeWorkNew).subscribe({
        next : (res:any) =>{
          this.timeWork = res.timeWork;
          this.loadTimeWork();
          this.closebutton.nativeElement.click();
          this.toastrService.success('Thêm thành công');
        },
        error:(err: HttpErrorResponse)=>{
          console.log(err);
          this.toastrService.error("Thêm không thành công");
        }
      })
    else
      this.timeWorkService.updateTimeWork(this.idStore as string, timeWorkNew).subscribe({
        next : (res:any) =>{
          this.timeWork = res.timeWork;
          this.loadTimeWork();
          this.closebutton.nativeElement.click();
          this.toastrService.success('Cập nhật thành công');
        },
        error:(err: HttpErrorResponse)=>{
          console.log(err);
          this.toastrService.error("Cập nhật không thành công");
        }
      })
  }

  // Load timework
  loadTimeWork(){
     this.timeWorkService.getTimeWork(this.idStore as string).subscribe(timework => {

       this.timeWork = timework;
       if(this.timeWork != null)

       this.timeWorkForm = new FormGroup({
         timeshift: new FormArray([
           new FormGroup ({
             timestart: new FormControl(this.timeWork.timeshift[0].timeStart),
             timeend: new FormControl(this.timeWork.timeshift[0].timeEnd)
           }),
           new FormGroup ({
             timestart: new FormControl(this.timeWork.timeshift[1].timeStart),
             timeend: new FormControl(this.timeWork.timeshift[1].timeEnd)
           }),
            new FormGroup ({
              timestart: new FormControl(this.timeWork.timeshift[2]!= null ? this.timeWork.timeshift[2].timeStart : null),
              timeend: new FormControl(this.timeWork.timeshift[2]!= null ? this.timeWork.timeshift[2].timeEnd : null)
            })
          ])
        });

      },
      error => console.log(error));
  }

  getDayInWeek()
  {
    this.datenow = this.datepipe.transform(this.date,'dd/MM/yyyy');
    function startOfWeek(date :any)
    {
      var startDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      return new Date(date.setDate(startDate));

    }
    function endofweek(date : any) {
      var lastday = date.getDate() - (date.getDay() - 1) + 6;
      return new Date(date.setDate(lastday));
    }
    var dt = new Date(this.date);
    this.startdayofweek = this.datepipe.transform(startOfWeek(dt));
    this.enddayofweek = this.datepipe.transform(endofweek(dt));
    function addDays(date : any, days : any) {
      const find = new Date(Number(date))
      find.setDate(date.getDate() + days)
      return find
    }
    const date = new Date(startOfWeek(dt));
    this.Mon = this.datepipe.transform(startOfWeek(dt),'dd/MM/yyyy');
    this.Tue = this.datepipe.transform(addDays(date, 1),'dd/MM/yyyy');
    this.Wed = this.datepipe.transform(addDays(date, 2),'dd/MM/yyyy');
    this.Thru = this.datepipe.transform(addDays(date, 3),'dd/MM/yyyy');
    this.Fri = this.datepipe.transform(addDays(date, 4),'dd/MM/yyyy');
    this.Sat = this.datepipe.transform(addDays(date, 5),'dd/MM/yyyy');
    this.Sun = this.datepipe.transform(endofweek(dt),'dd/MM/yyyy');
  }
}
