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
import { BookComponent } from './front/book/book.component';
import { AccBookComponent } from './front/acc-book/acc-book.component';
import { HeaderComponent } from './front/header/header.component';
import { FooterComponent } from './front/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicationComponent } from './front/publication/publication.component';
import { CommentComponent } from './front/comment/comment.component';



export const appRouteList: Routes = [
  {
    path: 'home',
    component: HomeComponent
},
  {
      path: 'page1',
      component: Page1Component
  },
  {
    path: 'header',
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
  path: 'accbook',
  component: AccBookComponent
},
{
  path: 'publications',
  component: PublicationComponent
},
  {
      path: '**',
      redirectTo: 'blog'
  }
];
import {ActivityComponent} from "./backoffice/activity/activity.component";
import {ReviewComponent} from "./backoffice/review/review.component";
import {ReclamationComponent} from "./backoffice/reclamation/reclamation.component";
import {NewActivityComponent} from "./backoffice/new-activity/new-activity.component";
import {ActivityFrontComponent} from "./front/activityFront/activityFront.component";
import {ReclamationFrontComponent} from "./front/reclamationFront/reclamationFront.component";




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
    FooterComponent,
    BookComponent,
    AccBookComponent,
    HeaderComponent,
    ActivityComponent,
    ReviewComponent,
    ReclamationComponent,
    NewActivityComponent,
    ActivityFrontComponent,
    ReclamationFrontComponent,
    PublicationComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRouteList),
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
