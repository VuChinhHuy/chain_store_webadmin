import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/service/address.service';
import { PartnerService } from 'src/app/service/partner.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {
  id: any
  keyword = "name";
  test :any;
  provinces:any;
  district:any;
  ward:any;
  image: any;
  partner  = {
    id: "",
    name: "",
    address: "",
    logo: "",
    note: "",
    create_at: "",
    update_at: "",
    create_user: "",
    update_user: ""
  }
  constructor(
    private acivteRoute: ActivatedRoute,
    private addressService: AddressService,
    private partnerService : PartnerService,
    private toastService : ToastrService,
    private datepipe : DatePipe,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.id = this.acivteRoute.snapshot.paramMap.get("id")?.toString();
    this.addressService.getProvinces().subscribe(res=>{
      this.provinces = res;
    });
      this.image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg0NEBAQEBAODRANEBANDw8NDxAQFRUWFxUSExUYHSggGBolHRMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKCg0NGg0QDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADMQAQACAAQDBAkDBQEAAAAAAAABAgMEBREhMVESQWFxIjJCcoGRobHBE2LRUpLh8PGi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APooAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcYczyiZ+Eg8D3bDmO6Y84eABKAAAAAAAAAAAAAAAAAAAAAAbOUys4lto4RHOeewMWHhWtPZrG89IWeX0nvvPwr/AC38vl64dezWPj3z5swMOFlqV5ViPHbefmzbAAw4mWpbnWJ+G0/NmAVePpMc6Tt4W4x81XjYNqTMWjbzdQxY+BW8bWjf7x5A5gbOcyk4c7c47pawAAAAAAAAAAAAAAAAAAMmBhza0VjnM/7Lo8tgRSsVj/s9Wjo2BwnEnv8ARr5Rz/3wWYAAAAAAAAMeYwYvWazyn6T1c5mMKaWms84+vi6dWazgb1jEjnHCfKQUwlAAAAAAAAAAAAAAAAPWHHGvnAOlyuH2aUr0rHzZQAAAAAAAAAY8enapavWJhkAcpZDJjxte8dLTH1YwAAAAAAAAAAAAAAE1naYnpMSgB1cSlradi9rCpPSOzPnHBsgAAAAAAAAEjBncTs4d579to854QDncWd7WnrMy8JsgAAAAAAAAAAAAAABKAFlpGZ7NppPK3L3l05Wsr7T85+pXafWjn4+MA3AAAAAAAAFNrOY3mMOOVeM+fRvZ/ORh12j1p5R08XPzMzvvx3BAAAAAAAAAAAAAAAAAAD3h4k1mJjhMcph4AXuS1Gttot6NvHlLe3co2svnr04RO8dLcYB0QrMLV6+1WY8Y4wz11LCn2pjzrINwadtSwo9r/wAywYur19msz720QCy3aOd1GtN619K30jzVuYz978JnaOleENUHrExJtM2njM97wAAAAAAAAAAAAAAAAAAJiN+Xfy6yCE7N7L6Ze3Gdqx48/k38HS8OOe9vPl8oBRbM1Mpe3Klvlt93RYeFWvKsR5Rs9goI03E/p287Q9xpWJ+3+7/C8AUc6Xift/un+HmdMxOkT5WhfAOcvksSOdLfDj9mC1duExMee8OqebUiecRPnG4OVSv8XTsO3KOzPWv8NHMaXeONZi0fKwK0erUmJmJiYmO6eEvIAAAAAAAAAAAAAlbafp3t3jxis/eQamUyFsTafVr1nnPlC5y2Uph+rHHrPGWeIAAAAAAAAAAAAAYsfL1vG1o3+8fFT5zTppvMelX6xHivQHKbIXGoadvvekcec1jv8Y8VRIIAAAAAAAAShtZDLfqX27o4z/ANvSslyxLR7sflborHBIAAAAAAAAAAAAAAAACq1XJ88Sse9H5WqJgHLTV5beoZf9O8x7M8a+XRqAAAAAAAOg0zB7OHE99+M+XcpMth9q1a9bRDpogEgAAAAAAAAAAAAAAAAAAA09TwO1hzPfT0o/MKCXVWjg5jMU7N7V6Tt8AYwAAAAAb2kV3xY/bWbfj8r5TaHHpXnpX8/wCFyAAAAAAAAAAAAAAAAAAAAAotWptizP8AVWJ/H4Xqn1z16T1rP3BVgAAAAAtND9bE92FwAAAAAAAAAAAAAAAAAAAAACm131sP3Z+6QFWAAAD/2Q==";
      this.partnerService.getPartner(this.id).subscribe(
        (res:any) =>{
          this.partner.id = res.id,
          this.partner.name = res.name,
          this.partner.address = res.address,
          this.partner.logo = res.logo !=null ? res.logo : this.image,
          this.partner.note = res.note,
          this.partner.create_at = res.create_at,
          this.partner.create_user = res.create_user


        }
      );
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
          this.partner.logo = reader.result as string;
        }
      }
      console.log(btoa(this.image));

    }
    unsave(){
      this.location.back();
    }
    save()
    {
      this.partner.update_user = localStorage.getItem("username")!.toString();
      this.partner.update_at = this.datepipe.transform( Date(),"yyyy-MM-dd")!.toString();
      this.partnerService.updatePartner(this.id,this.partner).subscribe({
        next : (res:any)=>{
          this.toastService.success("Ch???nh s???a th??nh c??ng ");
          this.location.back();

        },
        error : (e)=>{
          this.toastService.error("Ch???nh s???a kh??ng th??nh c??ng ");
        }
      })
    }
}
