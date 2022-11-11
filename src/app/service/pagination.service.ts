import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Pagination
{
  public pagination(count: any)
  {
    if(count ===0)
      return 0;
    else if( count % 10 == 0  )
     return (count / 10)  ;
    else
      return (count - (count % 10)) / 10  + 1;
  }
}
