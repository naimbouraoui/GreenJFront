import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './backoffice/sidebar/sidebar.component';
import { Page1Component } from './backoffice/page1/page1.component';
import { Page2Component } from './backoffice/page2/page2.component';
import { RouterModule, Routes } from '@angular/router';
import { AccomodationFormComponent } from './backoffice/accomodation-form/accomodation-form.component';


export const appRouteList: Routes = [
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
      path: '**',
      redirectTo: 'page1'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    Page1Component,
    Page2Component,
    AccomodationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRouteList)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
