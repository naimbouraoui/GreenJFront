export interface MessageType {
  date: string;
  sender: string;
  mediaUrl?: string;
  type: string;
  message:string;
  avatar?:string;
}
export interface GroupMessageType extends MessageType {
  avatar: string;
  icon: string;
  userNales: string;
}
export interface AccountConversationCreationType {
  newConversationId: string;
  messagesRead: number;
  messages: MessageType[];
  sendNotification:boolean,
  recieverFlatName?: string
}