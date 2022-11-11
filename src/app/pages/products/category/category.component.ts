import { Component, OnInit,ViewChild } from '@angular/core';
import { CatelogryService } from 'src/app/service/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  addCategoryFrom: FormGroup | any;
  idCategory!: string;
  arrayCate : any = [];

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  @ViewChild('closebutton') closebutton!: any;

  constructor(private categoryService: CatelogryService, private toastrService: ToastrService ) { }

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.categoryService.getAllCategory().subscribe(data =>{
        this.arrayCate = data;
        console.log(data);
    });
    this.addCategoryFrom = new FormGroup({
      name: new FormControl("", [Validators.required]),
      note: new FormControl(""),
    });
  }
  addCategory = (addCategoryFrom : any) =>{
    const category ={... addCategoryFrom};
    const cate = {
      "name" : category.name,
      "note": category.note,
      "create_user": localStorage.getItem("username")?.toString(),
      "update_user": ""
    }
    console.log(cate);
    this.categoryService.addCategory(cate)
    .subscribe({
      next: (res:any) => {
        this.ngOnInit();
        this.closebutton.nativeElement.click();
        this.toastrService.success('Thêm thành công danh mục mới!');
    },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
        this.toastrService.error("Thêm không thành công");
      }
    });
  }
  deleteCategory(id: string)
  {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res:any) => {
        this.ngOnInit();
        this.toastrService.info('Xoá thành công danh mục');
    },
      error:(err: HttpErrorResponse)=>{
        console.log(err);
        this.toastrService.error("Xoá không thành công");
      }
    });
  }
}
