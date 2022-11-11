import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatelogryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { PaginationComponent } from 'src/app/pagination/pagination/pagination.component';
import { Pagination } from 'src/app/service/pagination.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {
  constructor(private categoryService: CatelogryService,
    private router: Router,
    private productServie : ProductService,
    private pagination : Pagination) { }
  arrayCategory :any = [];
  idCate!: string;
  arrayProduct : any = [];
  sumPage : any;
  pageIndex : any;

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data=>{
      this.arrayCategory = data;
      this.idCate = this.arrayCategory[0].id;
      this.productServie.getProductWithCategory(this.idCate,1).subscribe(res=>{
        this.arrayProduct = res;
        this.sumPage = this.pagination.pagination(this.arrayProduct.count);
        console.log(this.sumPage);
      });
    });


  }
  settingCategory(){
    this.router.navigate(["products/category"]);
  }
  selectedCategory(id:string)
  {
    this.idCate = id;

    this.productServie.getProductWithCategory(this.idCate,1).subscribe(res=>{
      this.arrayProduct = res;
      this.sumPage = this.pagination.pagination(this.arrayProduct.count);
    });

  }
  pageSelect(e : any){
    this.pageIndex = e;
    this.productServie.getProductWithCategory(this.idCate,this.pageIndex).subscribe(res=>{
      this.arrayProduct = res;
    })

  }

}
