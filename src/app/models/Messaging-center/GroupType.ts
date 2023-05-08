import { GroupMessageType } from "./MessagesType";

export interface GroupType {
  administratorUid: string;
  createdBy: string;
  creationDate: string;
  groupAvatarUrl: string;
  groupDescription: string;
  groupName: string;
  members: string[];
  messages: GroupMessageType[];
}

export interface AccountGroupType {
  groupId: string;
  groupName: string;
  lastMessage: string;
  lastMessageDate: string;
  lastMessageSender: string;
  lastMessageType: string;
  lastSenderInitials: string;
  messagesRead: number;
  totalMessagesCount: number;
}
