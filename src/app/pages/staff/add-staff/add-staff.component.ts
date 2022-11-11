import { Component, OnInit, ViewChild } from '@angular/core';
import {StoreService} from '../../../service/store.service';
import {AddressService} from '../../../service/address.service';
import { StaffService } from 'src/app/service/staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AnimationStyleMetadata } from '@angular/animations';
import { AuthService } from 'src/app/service/auth.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  keyword = "name";
  namestore ="namestore";
  test :any;
  provinces:any;
  district:any;
  ward:any;
  store:any;
  cood :any =[{"name":"Nhân viên","role":"staff"},{"name":"Quản lí","role":"manager"}];
  image :any;
  address: any;
  addStaffForm :FormGroup | any;
  idStore: string |undefined;
  ismanger : boolean = true;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  @ViewChild('closebutton') closebutton!: any;
  constructor(private storeService: StoreService,
    private addressService: AddressService,
    private staffService: StaffService,
    private accountService : AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private acivteRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idStore = this.acivteRoute.snapshot.paramMap.get("id")?.toString();
    this.ismanger = this.acivteRoute.snapshot.paramMap.get("ismanager")?.toString() === "true";
    console.log(this.ismanger);
    this.addressService.getProvinces().subscribe(res=>{
      this.provinces = res;
    });



    this.image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg0NEBAQEBAODRANEBANDw8NDxAQFRUWFxUSExUYHSggGBolHRMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKCg0NGg0QDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADMQAQACAAQDBAkDBQEAAAAAAAABAgMEBREhMVESQWFxIjJCcoGRobHBE2LRUpLh8PGi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APooAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcYczyiZ+Eg8D3bDmO6Y84eABKAAAAAAAAAAAAAAAAAAAAAAbOUys4lto4RHOeewMWHhWtPZrG89IWeX0nvvPwr/AC38vl64dezWPj3z5swMOFlqV5ViPHbefmzbAAw4mWpbnWJ+G0/NmAVePpMc6Tt4W4x81XjYNqTMWjbzdQxY+BW8bWjf7x5A5gbOcyk4c7c47pawAAAAAAAAAAAAAAAAAAMmBhza0VjnM/7Lo8tgRSsVj/s9Wjo2BwnEnv8ARr5Rz/3wWYAAAAAAAAMeYwYvWazyn6T1c5mMKaWms84+vi6dWazgb1jEjnHCfKQUwlAAAAAAAAAAAAAAAAPWHHGvnAOlyuH2aUr0rHzZQAAAAAAAAAY8enapavWJhkAcpZDJjxte8dLTH1YwAAAAAAAAAAAAAAE1naYnpMSgB1cSlradi9rCpPSOzPnHBsgAAAAAAAAEjBncTs4d579to854QDncWd7WnrMy8JsgAAAAAAAAAAAAAABKAFlpGZ7NppPK3L3l05Wsr7T85+pXafWjn4+MA3AAAAAAAAFNrOY3mMOOVeM+fRvZ/ORh12j1p5R08XPzMzvvx3BAAAAAAAAAAAAAAAAAAD3h4k1mJjhMcph4AXuS1Gttot6NvHlLe3co2svnr04RO8dLcYB0QrMLV6+1WY8Y4wz11LCn2pjzrINwadtSwo9r/wAywYur19msz720QCy3aOd1GtN619K30jzVuYz978JnaOleENUHrExJtM2njM97wAAAAAAAAAAAAAAAAAAJiN+Xfy6yCE7N7L6Ze3Gdqx48/k38HS8OOe9vPl8oBRbM1Mpe3Klvlt93RYeFWvKsR5Rs9goI03E/p287Q9xpWJ+3+7/C8AUc6Xift/un+HmdMxOkT5WhfAOcvksSOdLfDj9mC1duExMee8OqebUiecRPnG4OVSv8XTsO3KOzPWv8NHMaXeONZi0fKwK0erUmJmJiYmO6eEvIAAAAAAAAAAAAAlbafp3t3jxis/eQamUyFsTafVr1nnPlC5y2Uph+rHHrPGWeIAAAAAAAAAAAAAYsfL1vG1o3+8fFT5zTppvMelX6xHivQHKbIXGoadvvekcec1jv8Y8VRIIAAAAAAAAShtZDLfqX27o4z/ANvSslyxLR7sflborHBIAAAAAAAAAAAAAAAACq1XJ88Sse9H5WqJgHLTV5beoZf9O8x7M8a+XRqAAAAAAAOg0zB7OHE99+M+XcpMth9q1a9bRDpogEgAAAAAAAAAAAAAAAAAAA09TwO1hzPfT0o/MKCXVWjg5jMU7N7V6Tt8AYwAAAAAb2kV3xY/bWbfj8r5TaHHpXnpX8/wCFyAAAAAAAAAAAAAAAAAAAAAotWptizP8AVWJ/H4Xqn1z16T1rP3BVgAAAAAtND9bE92FwAAAAAAAAAAAAAAAAAAAAACm131sP3Z+6QFWAAAD/2Q==";
    this.addStaffForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password : new FormControl("", [Validators.required]),
      coor : new FormControl(this.cood[0],),
      name : new FormControl("", [Validators.required]),
      birthday : new FormControl("",Validators.required),
      phone : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      no_home : new FormControl("", [Validators.required]),
      district : new FormControl("", [Validators.required]),
      ward : new FormControl("", [Validators.required]),
      city : new FormControl("", [Validators.required]),
      note: new FormControl(""),
    });
  }
  selectEventCity(item : any) {
    // do something with selected item

    this.addressService.getDistricts().subscribe(data =>{
      let d = data as any[];
      this.district = [...d.filter(a=> a.province_code === item.code)];
    });
  }
  inputClearedCity(e: any){
    this.district = [];
    this.inputClearedDistrict(e);

  }
  inputClearedDistrict(e:any){
    this.ward=[];
  }
  selectEventDistrict(item : any){
    this.addressService.getWard().subscribe(data =>{
      let w = data as any[];
      this.ward = [...w.filter(a=> a.district_code === item.code)];

    })
  }
  selectEventWard(item : any){

  }
  selectEventStore(item : any){

  }
  // onChangeSearch(search: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  // }

  // onFocused(e: any) {
  //   // do something
  //   console.log(e);
  // }

  clickReturn(){
    this.router.navigate(["chain-store"]);
  }

  processFile(event :any)
  {
    if (event.target.files && event.target.files[0]) {
      var  reader: FileReader = new FileReader();
      reader.readAsDataURL( event.target.files[0]);
      reader.onload = () =>{
        this.image = reader.result as string;
      }
    }
    console.log(btoa(this.image));

  }
  clickunsave(){
    this.router.navigate(["chain-store/detail/",this.idStore]);
  }
  addStaff = (addStaffForm :any)=>{
    const staff ={...addStaffForm};
    const account: Account  = {
      username: staff.username,
      password: staff.password,
      role: staff.coor.role,
      create_user: localStorage.getItem("username")?.toString() as string,
      update_user: ""
  }
  console.log(account);
  this.accountService.addAccount(account).subscribe({
    next: (res:any)=>{
      const staffNew = {
        "fullname": staff.name,
        "phone": staff.phone,
        "avt": this.image,
        "birthday":staff.birthday,
        "address": staff.no_home + ','+ staff.ward.name +', '+ staff.district.name+', ' + staff.city.name,
        "accountId":res.id as string,
        "storeId" : this.idStore as string,
        "create_user": localStorage.getItem("username")?.toString(),
        "update_user": ""
      } ;
      console.log(staffNew);
      this.staffService.addStaff(staffNew).subscribe({
        next: (staffsucces:any)=>{
          this.clickunsave();
          this.toastrService.success('Thêm thành công nhân viên '+staffsucces.fullname+' mới!');
        },
        error:(err: HttpErrorResponse)=>{
          console.log(err);
          this.accountService.deleteAccount(res.id as string);
          this.toastrService.error("Thêm không thành công");
        }
      });
    },
    error:(err: HttpErrorResponse)=>{
      console.log(err);
      this.toastrService.error("Thêm không thành công");
    }
  });


  }
}
