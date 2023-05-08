import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MessagingCenterComponent } from './messaging-center.component';
import { PipesModule } from 'src/app/services/messagingCenter/pipes/pipes.module';



const routes: Routes = [{ path: '', component: MessagingCenterComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    //PipesModule
  ]
})
export class MessagingCenterModule { }
