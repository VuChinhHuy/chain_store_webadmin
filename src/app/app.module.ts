import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';
import {TokenStorageService} from './service/token-storage.service';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
  }),
  NgxDaterangepickerMd.forRoot(
    {separator: ' - ',
    applyLabel: 'Okay',}),
  ToastrModule.forRoot(
    {
      timeOut: 1000,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
    }
  ),

  ],
  providers: [TokenStorageService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
