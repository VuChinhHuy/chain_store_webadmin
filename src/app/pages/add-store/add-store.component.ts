import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';
import {AddressService} from '../../service/address.service';
import { StaffService } from 'src/app/service/staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  keyword = "name";
  provinces:any;
  district:any;
  ward:any;
  manager:any;
  addStore : FormGroup | any;

  constructor(private storeService: StoreService,private addressService: AddressService,private staffService: StaffService,private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.staffService.getManager().subscribe(res=>{
      this.manager = res;
    });
    // this.test = this.service.getCoordinates("Linh Trung,Thủ Đức,HCM");
    this.addStore = new FormGroup({
      namestore: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      ward: new FormControl("", [Validators.required]),
      lat: new FormControl("", [Validators.required]),
      long: new FormControl("", [Validators.required]),
      // managerstore: new FormControl(""),
      note: new FormControl(""),
    })
    this.addressService.getProvinces().subscribe(res=>{
      this.provinces = res;
    });

  }
  selectEventCity(item : any) {
    // do something with selected item
    this.district = item.districts

  }
  inputClearedCity(e: any){
    this.district = [];
    this.inputClearedDistrict(e);

  }
  inputClearedDistrict(e:any){
    this.ward=[];
  }
  selectEventDistrict(item : any){
    this.ward = item.wards

  }
  selectEventWard(item : any){

  }
  selectEventManager(item : any){

  }
  // onChangeSearch(search: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  // }

  // onFocused(e: any) {
  //   // do something
  //   console.log(e);
  // }
  clickSaveStore(addstoreFormValue : any){
    const store = {...addstoreFormValue};
    const addressStore = store.street + ','+ store.ward.name +', '+ store.district.name+', ' + store.city.name;

    const newStore = {
      "namestore" : store.namestore as string,
      "address": addressStore,
      "note" : store.note,
      "coordinates": [store.lat, store.long],
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": ""

    }
    console.log(newStore);
    this.storeService.addStore(newStore).subscribe({
      next : (res:any) =>{
        this.ngOnInit();
        this.clickReturn();
        this.toastrService.success('Thêm thành công cửa hàng mới!');
      },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
        this.toastrService.error("Thêm không thành công");
      }
    })
  }
  clickReturn(){
    this.router.navigate(["chain-store"]);
  }

}
