import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/service/staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  idStaff: string | undefined;
  isStatus = "";
  isDisableValue =  true;
  profileAccount: any;
  profileStaff: any;
  profile: any;
  constructor(private staffService: StaffService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.isDisableValue = true;
    this.getByIdStaff(this.route.snapshot.paramMap.get('idstaff'));

  }
  enableAndDisable(){
    if(this.isDisableValue == false)
    this.isDisableValue = true;
    else
    this.isDisableValue = false;
  }
  getByIdStaff(id: string | null): void {
    this.staffService.getStaffbyId(id)
      .subscribe(
        (Status: any) => {
            this.profileAccount = Status.account;
            this.profileStaff = Status.staff;
        },
        (error: any) => {
          console.log(error);
        });
  }
  UpdateByIdStaff(): void {
    this.staffService.UpdateStaffAsync(this.profileStaff.id, this.profileStaff)
      .subscribe(
        (Status: any) => {
            this.isStatus = "UpdateSucess!";
            this.toastrService.success("Cập nhật  thành công");
            console.log(this.isStatus);
        },
        (error: any) => {
          this.toastrService.error("Cập nhật không thành công");
          console.log(error);
        });
  }



}
