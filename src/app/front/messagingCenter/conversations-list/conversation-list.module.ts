import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsListComponent } from './conversations-list.component';

const routes: Routes = [
  
  { path: '', component: ConversationsListComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ConversationListModule {}
