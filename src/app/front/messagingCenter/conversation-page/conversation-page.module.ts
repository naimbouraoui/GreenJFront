import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';import { FormsModule } from '@angular/forms';
import { ConversationPageComponent } from './conversation-page.component';
const routes: Routes = [{ path: '', component: ConversationPageComponent }


];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ]
})
export class ConversationPageModule { }
