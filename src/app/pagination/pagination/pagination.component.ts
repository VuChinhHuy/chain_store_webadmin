import { Component, EventEmitter, Input, Output,OnChanges,ChangeDetectionStrategy, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

   sum = 0;
  @Input()
  set sumList(value : any){
    this.sum = value;
  }
  get sumList()
  {
    return this.sum;
  }

  @Output()
  pageIndex = new EventEmitter<any>();

  page = 1;
  constructor() { }

  ngOnInit(): void {

  }


  clickRight()
  {
    if(this.page < this.sumList)
      this.page ++;
    this.pageIndex.emit(this.page);
  }
  clickLeft()
  {
    if(this.page > 1)
      this.page--;
    this.pageIndex.emit(this.page);
  }
  clickPageIndex(index : any)
  {
    this.page = index + 1;
    this.pageIndex.emit(this.page);
  }


}
