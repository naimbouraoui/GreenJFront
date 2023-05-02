import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountConversationType } from 'src/app/models/Messaging-center/conversationType';
import { MessagingCenterService } from 'src/app/services/messagingCenter/messaging-center.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css'],
})
export class ConversationsListComponent implements OnInit {
  conversations!: AccountConversationType[];
  updateDateTime: any;
  searchFriend: any = '';
  loggedInUser: any;
  accountConversationsChangedSubscription!: Subscription;
  accountconversationSubs: any;
  constructor(
    private messageSrv: MessagingCenterService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.accountconversationSubs();
    this.accountConversationsChangedSubscription.unsubscribe();
  }
  ngOnInit() {
    const loggedInUser = this.messageSrv.getLoggedInUser();
    this.loggedInUser = loggedInUser;
    this.accountConversationsChangedSubscription =
      this.messageSrv.accountMessagesChanged.subscribe((items: any) => {
        this.getConversations(items);
      });
      this.initAccountConversationsList();

  }
  async initAccountConversationsList() {
    this.accountconversationSubs =
      await this.messageSrv.getAllLoggedUserAccountConversations();
  }
  async getConversations(accountConversations: AccountConversationType[]) {
    if (accountConversations.length > 0) {
      accountConversations.forEach((AccountConversation) => {
        if (AccountConversation) {
          if (AccountConversation != null) {
            AccountConversation.unreadMessagesCount =
              AccountConversation.totalMessagesCount -
              AccountConversation.messagesRead;
            switch (true) {
              case AccountConversation.lastMessageType === 'text':
                {
                  if (
                    AccountConversation.lastMessageSender ===
                    this.loggedInUser.accountId
                  ) {
                    AccountConversation.listDisplayMessage =
                      'Vous : ' + AccountConversation.lastMessage;
                  } else {
                    AccountConversation.listDisplayMessage =
                      AccountConversation.lastMessage;
                  }
                }
                break;
              default:
                {
                  AccountConversation.listDisplayMessage =
                    AccountConversation.lastMessage;
                }
                break;
            }
          }
        }
      });
      this.addOrUpdateConversation(accountConversations);
    } else {
      this.conversations = [];
    }
  }

  addOrUpdateConversation(accountConversations: AccountConversationType[]) {
    this.conversations = accountConversations;
    this.conversations.sort((a: any, b: any) => {
      const date1 = new Date(a.lastMessageDate);
      const date2 = new Date(b.lastMessageDate);
      if (date1 > date2) {
        return -1;
      } else if (date1 < date2) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  navigateToConversation(conversation: AccountConversationType) {
    this.router.navigate(['ConversationPage'], {
      queryParams: {
        conversationId: conversation.conversationId,
        userId: conversation.key,
      },
    });
  }

  hasUnreadMessages(conversation: AccountConversationType) {
    console.log('%c test douran','color:blue', );
    if (
      conversation.unreadMessagesCount &&
      conversation.unreadMessagesCount > 0
    ) {
      return 'bold';
    } else {
      return '';
    }
  }
  dateUpdater() {
    const that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function () {
        if (that.conversations) {
          that.conversations.forEach((conversation) => {
            const date = conversation.listDisplayDate!;
            conversation.listDisplayDate = new Date(date);
          });
        }
      }, 60000);
    }
  }
}
