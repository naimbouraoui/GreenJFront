import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageType } from 'src/app/models/Messaging-center/MessagesType';
import { AccountType } from 'src/app/models/Messaging-center/accountType';
import { MessagingCenterService } from 'src/app/services/messagingCenter/messaging-center.service';

@Component({
  selector: 'app-messaging-center',
  templateUrl: './messaging-center.component.html',
  styleUrls: ['./messaging-center.component.css'],
})
export class MessagingCenterComponent implements OnInit {
  accountListSubscription!: Subscription;
  allAccounts!: AccountType[];
  showConversationList = false;

  constructor(
    private messagingSrv: MessagingCenterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init center page')
    this.fetchData();
    this.accountListSubscription =
      this.messagingSrv.allAccountsChanged.subscribe((accountsItems: any) => {
        this.allAccounts = accountsItems;
      });
  }
  async fetchData() {
    await this.messagingSrv.fetchAccount();
    const allAccounts = this.messagingSrv.getAllAccounts();
    this.allAccounts = allAccounts;
  } 
  login(userUid: string) {
    this.messagingSrv.setLoggedInUser(userUid);
    this.navigateToConversation()
  }
  navigateToConversation() {
    this.router.navigate(['ConversationList']);
  }
  addAccount() {
    this.messagingSrv.addUser();
  }
  createConversation(startIndex: number) {
    const loggedInUser = this.allAccounts[startIndex];
    const loggedInUserId = loggedInUser.accountId;
    const userId = this.allAccounts[startIndex + 1].accountId;
    const messages: MessageType[] = [];
    const newMessage: MessageType = {
      date: new Date().toString(),
      sender: loggedInUserId,
      type: 'text',
      message: 'coucou ' + Math.random(),
      mediaUrl: null!,
    };
    messages.push(newMessage);
    const users: string[] = [];
    users.push(loggedInUserId);
    users.push(userId);

    const newConversation = {
      dateCreated: new Date().toString(),
      messages,
      users,
    };
    this.messagingSrv
      .createConversation(newConversation)
      .then(async (successkey) => {
        const newConversationId = successkey;
        /*  this.conversationId = successkey;
        this.textMessage = ''; */
        await this.messagingSrv.createAccountConversation(
          loggedInUserId,
          userId,
          {
            newConversationId,
            messagesRead: 1,
            messages,
            sendNotification: true,
            recieverFlatName: loggedInUser.accountFlatName,
          }
        );
        await this.messagingSrv.createAccountConversation(
          userId,
          loggedInUserId,
          {
            newConversationId,
            messagesRead: 0,
            messages,
            sendNotification: false,
          }
        );
        //   this.initConversaton();
      });
    // this.scrollBottom();
  }
}
