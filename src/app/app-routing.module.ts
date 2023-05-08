import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [];
=======
import {ActivityComponent} from "./backoffice/activity/activity.component";
import {NewActivityComponent} from "./backoffice/new-activity/new-activity.component";
import {ReviewComponent} from "./backoffice/review/review.component";
import {ReclamationComponent} from "./backoffice/reclamation/reclamation.component";
import {BlogComponent} from "./front/blog/blog.component";
import {HeaderComponent} from "./front/header/header.component";
import {ReclamationFrontComponent} from "./front/reclamationFront/reclamationFront.component";
import {ActivityFrontComponent} from "./front/activityFront/activityFront.component";


export const routes: Routes = [
  {
    path : 'blog',
    component: BlogComponent
  },
  {
    path : 'header',
    component: HeaderComponent
  },
  {
    path : 'Activities',
    component: ActivityComponent
  },
  {
    path : 'NewActivity',
    component: NewActivityComponent
  },
  {
    path : 'review',
    component: ReviewComponent
  },
  {
    path : 'reclamation',
    component: ReclamationComponent
  },
  {
    path: '**',
    redirectTo: 'IndexComponent'
  },
  {
    path: 'dash',
    component: BlogComponent
  },
  {
    path: 'recFront',
    component: ReclamationFrontComponent
  },
  {
    path: 'acFront',
    component: ActivityFrontComponent
  }




];

>>>>>>> origin/houssem-branch

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
