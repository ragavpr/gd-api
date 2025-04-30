import * as TR from '../Serializers';

export type Message = {
  messageID      : number;   // The message ID
  accountID      : number;   // The other user's account ID
  playerID       : number;   // The other user's player ID
  title          : string;   // The title encoded in Base64
  messageCContent: string;   // The message which has been Xor'd with a key of 14251 and then encoded in base64
  username       : string;   // The other user's username
  age            : string;   // How long ago the message was sent (e.g. '2 months')
  read           : boolean;  // 0 if the message hasn't been read, 1 if it has
  sender         : boolean;  // 0 if the user is receiving the message, 1 if they sent it
};
export const MessageM: TR.KeyMap = {
  1: 'messageID',
  2: 'accountID',
  3: 'playerID',
  4: 'title',
  5: 'messageCContent',
  6: 'username',
  7: 'age',
  8: 'read',
  9: 'sender',
};
