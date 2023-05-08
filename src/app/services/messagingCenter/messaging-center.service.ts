import { Injectable } from '@angular/core';
import { AccountType } from 'src/app/models/Messaging-center/accountType';
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { snapshotToArray } from 'src/app/firebaseConfig';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  AccountConversationType,
  ConversationType,
} from 'src/app/models/Messaging-center/conversationType';
import {
  AccountConversationCreationType,
  MessageType,
} from 'src/app/models/Messaging-center/MessagesType';

@Injectable({
  providedIn: 'root',
})
export class MessagingCenterService {
  allAccounts!: AccountType[];
  allAccountsChanged = new Subject();
  messagesChanged = new Subject();
  accountMessagesChanged = new Subject();
  loggedInAccountConversations: any = [];
  loggedInUser!: AccountType;
  constructor(private toastr: ToastrService, private router: Router) {}


  // logged in User Conversations
  getAllLoggedUserAccountConversations() {
    const loggedInUser = this.getLoggedInUser();
    const loggedInUserId = loggedInUser.accountId;
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const starCountRef = ref(
        db,
        '/accounts/' + loggedInUserId + '/conversations'
      );
      const unsubscribe = onValue(starCountRef, (resp) => {
        let list = snapshotToArray(resp);
        if (list && list.length !== 0) {
          const filledList = this.fillAccountConversationsInterlocutors(list);
          this.loggedInAccountConversations = filledList;
          this.accountMessagesChanged.next(filledList);
        } else {
          this.accountMessagesChanged.next([]);
        }
      });
      resolve(unsubscribe);
    });
  }
  fillAccountConversationsInterlocutors(
    accountConversations: AccountConversationType[]
  ) {
    accountConversations.map((AccountConversation) => {
      const user = this.getUserByUid(AccountConversation.key!);
      AccountConversation.interlocutor = user
        ? user
        : { accountFlatName: 'Utilisateur supprimé' };
    });
    return accountConversations;
  }
  setLoggedInUser(userUid: string) {
    const loggedInUser = this.getUserByUid(userUid)!;
    this.loggedInUser = loggedInUser;
  }
  getLoggedInUser() {
    return this.loggedInUser;
  }
  // Conversations listings 
  createConversation(newMessage: ConversationType) {
    return new Promise<string>((resolve, reject) => {
      const db = getDatabase();
      const postListRef = ref(db, '/conversations');
      const newPostRef = push(postListRef);
      const newPostKey = newPostRef.key!;
      set(newPostRef, newMessage)
        .then(() => {
          resolve(newPostKey);
        })
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }
  updateConversationMessage(conversationId: string, payload: any) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      update(ref(db, '/conversations/' + conversationId), payload)
        .then(() => {})
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }
  getConversationMessages(conversationId: string) {
    return new Promise <void>((resolve, reject) => {
      const db = getDatabase();
      const starCountRef = ref(
        db,
        '/conversations/' + conversationId + '/messages'
      );
      //const unsubscribe = onValue(starCountRef, (resp) => {
        onValue(starCountRef, (resp) => {
        const item = resp.val();
        this.messagesChanged.next(item);
      //  resolve(unsubscribe);
        resolve();
      });
    });
  }
  getConversationIdByInterlocutorId(userUid: string) {
    return new Promise<string>((resolve, reject) => {
      const foundConversation = this.loggedInAccountConversations.find(
        (item: any) => item.key === userUid
      );
      let result = null;
      foundConversation && (result = foundConversation.conversationId);
      resolve(result);
    });
  }
  // Conversation update / creation flow 
  createAccountConversation(
    senderUid: string,
    recieverUid: string,
    conversationCreationPayload: AccountConversationCreationType
  ) {
    return new Promise<void>((resolve, reject) => {
      const db = getDatabase();
      const lastMessage =
        conversationCreationPayload.messages[
          conversationCreationPayload.messages.length - 1
        ];
      const payload = {
        conversationId: conversationCreationPayload.newConversationId,
        messagesRead: conversationCreationPayload.messagesRead,
        totalMessagesCount: conversationCreationPayload.messages.length,
        lastMessageDate: new Date().toString(),
        lastMessageSender: lastMessage.sender,
        lastMessageType: lastMessage.type,
        lastMessage: lastMessage.message ? lastMessage.message : null,
      };
      update(
        ref(db, '/accounts/' + senderUid + '/conversations/' + recieverUid),
        payload
      )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }
  setSenderAccountConversationStatus(
    user1: string,
    user2: string,
    messages: MessageType[]
  ) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const lastMessage = messages[messages.length - 1];
      const payload = {
        totalMessagesCount: messages.length,
        messagesRead: messages.length,
        lastMessageDate: new Date().toString(),
        lastMessageSender: lastMessage.sender,
        lastMessageType: lastMessage.type,
        lastMessage: lastMessage.message ? lastMessage.message : null,
      };
      update(ref(db, '/accounts/' + user1 + '/conversations/' + user2), payload)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }
  setRecieverAccountConversationStatus(
    user1: string,
    user2: string,
    messages: MessageType[]
  ) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();

      const lastMessage = messages[messages.length - 1];
      const payload = {
        totalMessagesCount: messages.length,
        lastMessageDate: new Date().toString(),
        lastMessageSender: lastMessage.sender,
        lastMessageType: lastMessage.type,
        lastMessage: lastMessage.message ? lastMessage.message : null,
      };
      update(ref(db, '/accounts/' + user1 + '/conversations/' + user2), payload)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }
  setAccountConversationReadMessage(
    user1: string,
    user2: string,
    messageslength: number
  ) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      update(ref(db, '/accounts/' + user1 + '/conversations/' + user2), {
        messagesRead: messageslength,
      })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          this.presentErrorToast(error);
        });
    });
  }

  // Messaging center administration
  async addUser() {
    let newAccount = {} as AccountType;

    newAccount = {
      accountId: '',
      accountFlatName: 'Ahmed Sassi',
      conversations: null!,
      groups: null!,
      pictureAvatar: null!,
    };
    const database = getDatabase();

    const postListRef = ref(database, 'accounts');
    const newPostRef = push(postListRef);
    const newPostKey = newPostRef.key;
    newAccount.accountId = newPostKey!;
    set(newPostRef, newAccount).catch((error) => {
      this.presentErrorToast(error);
    });

    this.presentToast('Compte ajouté avec succès');
    this.router.navigate(['/messagingCenter']);
  }
  fetchAccount() {
    console.log('fetching accounts ... ')

    const database = getDatabase();
    return new Promise<boolean>((resolve, reject) => {
      const starCountRef = ref(database, '/accounts');
      onValue(starCountRef, (resp) => {
        let list = snapshotToArray(resp);
        if (list && list.length !== 0) {
          console.log('recieved account page ',list)
          this.allAccounts = list;
          this.allAccountsChanged.next(list);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  getAllAccounts() {
    return this.allAccounts;
  }
  getUserByUid(userId: string) {
    const foundUser = this.allAccounts.find(
      (item) => item.accountId === userId
    );
    return foundUser;
  }

  // Utils 

  presentToast(param: string) {
    this.toastr.success(param);
  }
  presentErrorToast(param: string) {
    this.toastr.error(param);
  }

}
