import { MessageType } from './MessagesType';
import { AccountType } from './accountType';

export interface ConversationType {
  dateCreated: string;
  messages: MessageType[];
  users: string[];
}

export interface AccountConversationType {
  key?: string;
  conversationId: string;
  lastMessage: string;
  lastMessageDate: string;
  lastMessageSender: string;
  lastMessageType: string;
  messagesRead: number;
  totalMessagesCount: number;
  unreadMessagesCount?: number;
  listDisplayMessage?: string;
  listDisplayDate?: Date;
  interlocutor?:AccountType | { accountFlatName: string };
  
}
