import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Account} from '../../models/account.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl: string | any;
  loginForm: FormGroup | any;

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||'dashboard';
  }
  loginUser = (loginFormValue : any) =>{
      const login ={... loginFormValue};
      const userForAuth : Account = {
          username: login.username,
          password: login.password,
          create_user : "",
          update_user: "",
          role:""
      }
      this.authService.loginUser("account/login", userForAuth)
      .subscribe({
        next: (res:any) => {
         localStorage.setItem("jwt", res.token);
         localStorage.setItem("username",res.account.username.toString());
         this.router.navigate([this.returnUrl]);
      },
        error:(err: HttpErrorResponse)=>{
          console.log(err)
        }
      })
  }
}
