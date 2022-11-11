import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormArrayName, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatelogryService } from 'src/app/service/category.service';
import { PartnerService } from 'src/app/service/partner.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  category: any;
  productForm : FormGroup | any;
  partner : any;
  listimage : any =[];
  keyword = "name";
  quanity_img : any = 1;

  desFormArr = new FormArray([new FormControl()]);
  quanity_des : any = 1;
  constructor(
    private router : Router,
    private categoryService : CatelogryService,
    private acivteRoute: ActivatedRoute,
    private partnerService : PartnerService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const img =  {"number": 0,"src":"assets/img/theme/team-1-800x800.jpg","alt":"Hình ảnh sản phẩm"};
    this.listimage.push(img);


    this.categoryService.getCategory(this.acivteRoute.snapshot.paramMap.get('idcategory')?.toString()!).subscribe(res=>{
      this.category = res;
    })


    this.productForm = new FormGroup({
      nameproduct : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      partner : new FormControl('', Validators.required),
      size : new FormControl('', Validators.required),
      desc : this.desFormArr,
      note : new FormControl('', Validators.required),


    });
    this.partnerService.getAllPartner().subscribe(res=>{
      this.partner = res;
    })

  }
  selectQuanityImg(quanity : any)
  {
    this.quanity_img = quanity;
    this.listimage = [];
    for(let i = 0; i < this.quanity_img; i++){
      const img =  {"number": i,"src":"assets/img/theme/team-1-800x800.jpg","alt":"Hình ảnh sản phẩm"};
      this.listimage.push(img);
    }
    console.log(this.listimage);
  }
  selectQuanDes(qua : any){
    this.quanity_des = qua;
    this.desFormArr.clear();
    for(let i = 0; i < this.quanity_des; i++){



    var desform = new FormControl('');
    this.desFormArr.push(desform);
    }

  }
  processFile(event :any, no : any)
  {

    if (event.target.files && event.target.files[0]) {
      var  reader: FileReader = new FileReader();
      reader.readAsDataURL( event.target.files[0]);
      reader.onload = () =>{
        this.listimage[no].src = reader.result as string;

      }

    }


  }
  clickSubmitAddProduct(addProductValue : any)
  {
    const productValue = {...addProductValue};
    const product = {
      "name": productValue.nameproduct,
      "price" : productValue.price,
      "detail": productValue.desc,
      "image" : this.listimage,
      "partner" : productValue.partner,
      "category" : this.category,
      "note": productValue.note,
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": ""
    }
    console.log(product);
    this.productService.addProduct(product).subscribe({
      next: (res:any) => {
        this.router.navigate(['products']);

        this.toastrService.success('Thêm thành sản phẩm mục mới!');
    },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
        this.toastrService.error("Thêm không thành công");
      }
    });



  }
}
