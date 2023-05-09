import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageType } from 'src/app/models/Messaging-center/MessagesType';
import { AccountType } from 'src/app/models/Messaging-center/accountType';
import {
  AccountConversationType
} from 'src/app/models/Messaging-center/conversationType';
import { MessagingCenterService } from 'src/app/services/messagingCenter/messaging-center.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.css'],
})
export class ConversationPageComponent implements OnInit,OnDestroy {
  userId!: string;
  conversationId!: string;
  pageTitle: any;
  messages!: MessageType[];
  messagesToShow: any;
  loggedInUserId!: string;
  interlocutor!: AccountType;
  conversationData: any;
  // subscription
  messageChangeSub!: Subscription;
  conversationSubs: any;
  // Message flow
  textMessage: any = '';
  mediaUrl: any;
  updateDateTime: any;
  startIndex: any = -1;
  initialLoadedMessages = 10;

  showBackground = false;
  loggedInUserFlatName!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageSrv: MessagingCenterService,
    private router:Router
  ) {}
    ngOnDestroy(): void {
      console.log('ondestroy',);
      //console.log('ionwill leave',);
    this.showBackground = false;
    this.messages = null!;
    this.messagesToShow = null;
    this.messageChangeSub.unsubscribe();
   // this.setMessagesRead();
    }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.conversationId = params['conversationId'];
      this.userId = params['userId'];
    });
    this.initPage();
    this.messageChangeSub = this.messageSrv.messagesChanged.subscribe(
      (items) => {
        console.log('items ',items);
        const loggedInUser = this.messageSrv.getLoggedInUser();
        const loggedInUserId = loggedInUser.accountId;
        const loggedInUserName = loggedInUser.accountFlatName;
        this.loggedInUserFlatName = loggedInUserName;
        this.loggedInUserId = loggedInUserId;
        this.conversationData = items;
        this.getConversationData();
      }
    );
  }

  ionViewDidEnter() {
    this.showBackground = true;
  }
  ionViewWillLeave() {
    console.log('ionwill leave',);
    this.showBackground = false;
    this.messages = null!;
    this.messagesToShow = null;
  //  this.messageChangeSub.unsubscribe();
    this.setMessagesRead();
  }

  initPage() {
    console.log('init page',);
    const user = this.messageSrv.getUserByUid(this.userId)!;
    this.pageTitle = user ? user.accountFlatName : 'Utilisateur supprimé';
    this.interlocutor = user;
    this.initConversaton();
    const loggedInUser = this.messageSrv.getLoggedInUser();
    const loggedInUserId = loggedInUser.accountId;
    const loggedInUserName = loggedInUser.accountFlatName;
    this.loggedInUserId = loggedInUserId;
    this.loggedInUserFlatName = loggedInUserName;
  }
  async initConversaton() {
    console.log('init conv',this.conversationId);
    this.conversationId &&
      (this.conversationSubs = await this.messageSrv.getConversationMessages(
        this.conversationId
      ));
      console.log('conv subs',this.conversationSubs);
    if (!this.conversationId) {
      const foundConversationId =
        await this.messageSrv.getConversationIdByInterlocutorId(this.userId);
      foundConversationId && (this.conversationId = foundConversationId);
      this.conversationSubs = await this.messageSrv.getConversationMessages(
        this.conversationId
      );
    }
  }
  async getConversationData() {
    console.log('getconv data',this.messages);
    console.log('this.converdata',this.conversationData);
    let conversationMessages = this.conversationData;
    conversationMessages =
      conversationMessages !== null ? conversationMessages : [];
    if (this.messages) {
      console.log('if messages ',);
      if (conversationMessages.length > this.messages.length) {
        let message = conversationMessages[conversationMessages.length - 1];
        message.avatar = this.interlocutor?.pictureAvatar;

        this.messages.push(message);
        this.messagesToShow.push(message);
      }
    } else {
      console.log('else ',this.messages);
      this.messages = [];
      conversationMessages &&
        conversationMessages.forEach((message: MessageType) => {
          message.avatar = this.interlocutor?.pictureAvatar;
          this.messages.push(message);
        });
      if (this.startIndex === -1) {
        if (this.messages.length - this.initialLoadedMessages > 0) {
          this.startIndex = this.messages.length - this.initialLoadedMessages;
        } else {
          this.startIndex = 0;
        }
      }
      if (!this.messagesToShow) {
        this.messagesToShow = [];
      }
      for (let i = this.startIndex; i < this.messages.length; i++) {
        this.messagesToShow.push(this.messages[i]);
      }
      console.log('result else messagesToShow =',this.messagesToShow);
    }
  }
  send() {
    if (this.conversationId) {
      const messages: any = JSON.parse(JSON.stringify(this.messages));
      const newMessage: MessageType = {
        date: new Date().toString(),
        sender: this.loggedInUserId,
        type:'text',
        message: this.textMessage ? this.textMessage : null,
        mediaUrl: this.mediaUrl ? this.mediaUrl : null,
      };
      messages.push(newMessage);
      this.messageSrv.updateConversationMessage(this.conversationId, {
        messages,
      });
      this.setAccountMessagesStatus(messages);
    } else {
      const messages: MessageType[] = [];
      const newMessage: MessageType = {
        date: new Date().toString(),
        sender: this.loggedInUserId,
        type: 'text',
        message: 'coucou ' + Math.random(),
        mediaUrl: null!,
      };
      messages.push(newMessage);
      const users: string[] = [];
      users.push(this.loggedInUserId);
      users.push(this.userId);

      const newConversation = {
        dateCreated: new Date().toString(),
        messages,
        users,
      };
      this.messageSrv
        .createConversation(newConversation)
        .then(async (successkey) => {
          const newConversationId = successkey;
          await this.messageSrv.createAccountConversation(
            this.loggedInUserId,
            this.userId,
            {
              newConversationId,
              messagesRead: 1,
              messages,
              sendNotification: true,
              recieverFlatName: this.loggedInUserFlatName,
            }
          );
          await this.messageSrv.createAccountConversation(
            this.userId,
            this.loggedInUserId,
            {
              newConversationId,
              messagesRead: 0,
              messages,
              sendNotification: false,
            }
          );
        });
    }
    this.textMessage = '';
    this.mediaUrl = '';
  }
  async setMessagesRead() {
    this.messageSrv.setAccountConversationReadMessage(
      this.loggedInUserId,
      this.userId,
      this.conversationData.length
    );
  }
  setAccountMessagesStatus(allMessages: MessageType[]) {
    this.messageSrv.setSenderAccountConversationStatus(
      this.loggedInUserId,
      this.userId,
      allMessages
    );
    this.messageSrv.setRecieverAccountConversationStatus(
      this.userId,
      this.loggedInUserId,
      allMessages
    );
  }
  dateUpdater() {
    const that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function () {
        if (that.messages) {
          that.messagesToShow.forEach((message: AccountConversationType) => {
            const date = message.listDisplayDate;
            message.listDisplayDate = new Date(date!);
          });
        }
      }, 60000);
    }
  }
  isSender(message: MessageType) {
    if (message.sender === this.loggedInUserId) {
      return true;
    } else {
      return false;
    }
  }
  navigateBack()
  {
    this.router.navigate(['ConversationList']);
  }
}
