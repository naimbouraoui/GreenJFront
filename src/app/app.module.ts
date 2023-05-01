import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
      component: Page1Component
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
      path: '**',
      redirectTo: 'IndexComponent'
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
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRouteList),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
