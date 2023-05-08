import { AccountGroupType } from './GroupType';
import { AccountConversationType } from './conversationType';

export interface AccountType {
  accountId: string;
  accountFlatName: string;
  conversations?: AccountConversationType[];
  groups?: AccountGroupType[];
  pictureAvatar:string;
}
