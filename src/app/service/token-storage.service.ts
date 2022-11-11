import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements CanActivate {

  constructor(private jwtHelper : JwtHelperService,private router: Router) {

   }
   canActivate()     
   {
    // Lấy token lưu ở local storage
    const token = localStorage.getItem("jwt");
    // check token
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate([""]);
    return false;
   }
}
