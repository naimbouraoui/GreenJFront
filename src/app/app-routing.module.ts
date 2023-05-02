import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'messagingCenter',
    loadChildren: () =>
      import('./front/messagingCenter/messaging-center/messaging-center.module').then((m) => m.MessagingCenterModule),
  },
  {
    path: 'ConversationList',
    loadChildren: () =>
      import('./front/messagingCenter/conversations-list/conversation-list.module').then((m) => m.ConversationListModule),
  },
  {
    path: 'ConversationPage',
    loadChildren: () =>
      import('./front/messagingCenter/conversation-page/conversation-page.module').then((m) => m.ConversationPageModule),
  },  
  { path: '**', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
