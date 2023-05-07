import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, ɵHttpInterceptingHandler } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './backoffice/page1/page1.component';
import { Page2Component } from './backoffice/page2/page2.component';
import { RouterModule, Routes } from '@angular/router';
import { AccomodationFormComponent } from './backoffice/accomodation-form/accomodation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './backoffice/sidenav/sidenav.component';
import { RoomsComponent } from './backoffice/rooms/rooms.component';
import { AddRoomComponent } from './backoffice/add-room/add-room.component';
import { HomeComponent } from './backoffice/home/home.component';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './front/blog/blog.component';
import { IndexComponent } from './front/index/index.component';
import { BookComponent } from './front/book/book.component';
import { AccBookComponent } from './front/acc-book/acc-book.component';
import { HeaderComponent } from './front/header/header.component';
import { SignupComponent } from './front/signup/signup.component';
import {MatCardModule}from '@angular/material/card';
import {MatSnackBarModule}from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './front/login/login.component';
import { AuthGuard } from './front/auth/auth.guard';
import { AuthInterceptor } from './front/auth/auth.interceptor';
import { UserService } from './services/user.service';
import { NgxUiLoaderConfig ,SPINNER } from 'ngx-ui-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#000000', // set text color to black
  textPosition: 'center-center',
  bgsColor: '#7b1fa2',
  fgsColor: '#25974F', // set fgs color to green
  fgsType: SPINNER.circle,
  fgsSize: 100,
  hasProgressBar: false
};

import { RoomdetailsComponent } from './front/roomdetails/roomdetails.component';


export const appRouteList: Routes = [
  {
    path: 'home',
    component: HomeComponent 
},
{
  path: 'index',
  component: IndexComponent
},
  {
      path: 'page1',
      component: Page1Component,canActivate :[AuthGuard],data:{roles:['ADMIN_ROLE']}
  },
  {
    path: 'blog',
    component:BlogComponent},///,canActivate :[AuthGuard],data:{roles:['USER_ROLE']}
  {path: 'header',
    component:HeaderComponent
},
{
  path: 'blog',
  component:BlogComponent
},
  {
      path: 'page2',
      component: Page2Component
  },
  {
    path:'Accomodation-form',
    component: AccomodationFormComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'addroom',
    component: AddRoomComponent
},
{
  path: 'book',
  component: BookComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'accbook',
  component: AccBookComponent
},
{
  path: 'header',
  component: HeaderComponent
},
  {
      path: '**',
      redirectTo: 'AccBookComponent'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    AccomodationFormComponent,
    SidenavComponent,
    RoomsComponent,
    AddRoomComponent,
    HomeComponent,
    BlogComponent,
    IndexComponent,
    BookComponent,
    AccBookComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent ,
    RoomdetailsComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRouteList),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
   
  ],
  providers: [
    AuthGuard,
    {
      provide :HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true 
    },UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
