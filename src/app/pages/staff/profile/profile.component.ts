import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  idStaff : string |undefined;
  profile : any;
  constructor(private staffService : StaffService,
    private acivteRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idStaff = this.acivteRoute.snapshot.paramMap.get("idstaff")?.toString();
    this.staffService.getStaffWithId(this.idStaff as string).subscribe(res=>{
      this.profile = res;

    })
  }


}
