import { Component, OnInit } from '@angular/core';
import {AddressService} from '../../service/address.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartnerService } from 'src/app/service/partner.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  keyword = "name";
  test :any;
  provinces:any;
  district:any;
  ward:any;
  manager:any;
  image: any;
  addPartner : FormGroup | any;
  listPartner : any = [];
  constructor(private addressService: AddressService,
    private partnerService : PartnerService,
    private toastService : ToastrService,
    private router : Router) { }

  ngOnInit(): void {
    this.addressService.getProvinces().subscribe(res=>{
      this.provinces = res;
    });
    this.partnerService.getAllPartner().subscribe(res=>
      {this.listPartner = res});
    this.image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg0NEBAQEBAODRANEBANDw8NDxAQFRUWFxUSExUYHSggGBolHRMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKCg0NGg0QDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADMQAQACAAQDBAkDBQEAAAAAAAABAgMEBREhMVESQWFxIjJCcoGRobHBE2LRUpLh8PGi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APooAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcYczyiZ+Eg8D3bDmO6Y84eABKAAAAAAAAAAAAAAAAAAAAAAbOUys4lto4RHOeewMWHhWtPZrG89IWeX0nvvPwr/AC38vl64dezWPj3z5swMOFlqV5ViPHbefmzbAAw4mWpbnWJ+G0/NmAVePpMc6Tt4W4x81XjYNqTMWjbzdQxY+BW8bWjf7x5A5gbOcyk4c7c47pawAAAAAAAAAAAAAAAAAAMmBhza0VjnM/7Lo8tgRSsVj/s9Wjo2BwnEnv8ARr5Rz/3wWYAAAAAAAAMeYwYvWazyn6T1c5mMKaWms84+vi6dWazgb1jEjnHCfKQUwlAAAAAAAAAAAAAAAAPWHHGvnAOlyuH2aUr0rHzZQAAAAAAAAAY8enapavWJhkAcpZDJjxte8dLTH1YwAAAAAAAAAAAAAAE1naYnpMSgB1cSlradi9rCpPSOzPnHBsgAAAAAAAAEjBncTs4d579to854QDncWd7WnrMy8JsgAAAAAAAAAAAAAABKAFlpGZ7NppPK3L3l05Wsr7T85+pXafWjn4+MA3AAAAAAAAFNrOY3mMOOVeM+fRvZ/ORh12j1p5R08XPzMzvvx3BAAAAAAAAAAAAAAAAAAD3h4k1mJjhMcph4AXuS1Gttot6NvHlLe3co2svnr04RO8dLcYB0QrMLV6+1WY8Y4wz11LCn2pjzrINwadtSwo9r/wAywYur19msz720QCy3aOd1GtN619K30jzVuYz978JnaOleENUHrExJtM2njM97wAAAAAAAAAAAAAAAAAAJiN+Xfy6yCE7N7L6Ze3Gdqx48/k38HS8OOe9vPl8oBRbM1Mpe3Klvlt93RYeFWvKsR5Rs9goI03E/p287Q9xpWJ+3+7/C8AUc6Xift/un+HmdMxOkT5WhfAOcvksSOdLfDj9mC1duExMee8OqebUiecRPnG4OVSv8XTsO3KOzPWv8NHMaXeONZi0fKwK0erUmJmJiYmO6eEvIAAAAAAAAAAAAAlbafp3t3jxis/eQamUyFsTafVr1nnPlC5y2Uph+rHHrPGWeIAAAAAAAAAAAAAYsfL1vG1o3+8fFT5zTppvMelX6xHivQHKbIXGoadvvekcec1jv8Y8VRIIAAAAAAAAShtZDLfqX27o4z/ANvSslyxLR7sflborHBIAAAAAAAAAAAAAAAACq1XJ88Sse9H5WqJgHLTV5beoZf9O8x7M8a+XRqAAAAAAAOg0zB7OHE99+M+XcpMth9q1a9bRDpogEgAAAAAAAAAAAAAAAAAAA09TwO1hzPfT0o/MKCXVWjg5jMU7N7V6Tt8AYwAAAAAb2kV3xY/bWbfj8r5TaHHpXnpX8/wCFyAAAAAAAAAAAAAAAAAAAAAotWptizP8AVWJ/H4Xqn1z16T1rP3BVgAAAAAtND9bE92FwAAAAAAAAAAAAAAAAAAAAACm131sP3Z+6QFWAAAD/2Q==";
    this.addPartner = new FormGroup({
      namepartner: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      ward: new FormControl("", [Validators.required]),
      note: new FormControl("", ),
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

  clickSavePartnerForm(addFormValue : any)
  {
    const partnerValue = {...addFormValue};
    const addressPartner = partnerValue.street + ','+ partnerValue.ward.name +', '+ partnerValue.district.name+', ' + partnerValue.city.name;
    const partner = {
      "name" : partnerValue.namepartner as string,
      "address" : addressPartner,
      "logo" : this.image,
      "note" : partnerValue.note,
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": ""
    }

    this.partnerService.addPartner(partner).subscribe({
      next : (res : any) => {
        this.ngOnInit();

        this.toastService.success('Thêm thành công cửa hàng mới!');
      },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
        this.toastService.error("Thêm không thành công");
      }
    })
  }
  toEdit(id: string)
  {
    this.router.navigate(["partners/edit",id]);
  }

  deleted(id:string)
  {

    this.partnerService.deletePartner(id).subscribe(
      {
        next: (res:any)=>{
          this.partnerService.getAllPartner().subscribe(res=>
            {this.listPartner = res});
        }
        ,error : (e:any)=>{
          this.toastService.error("Xoá không thành công")
        }
      }
    );
  }

}
