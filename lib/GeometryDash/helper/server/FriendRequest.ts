import * as TR from '../Serializers';

export type FriendRequest = {
  friendRequestID : number;   // An ID unique to each friend request. (I'm not 100% certain on this)
  accountID       : number;   // The other user's account ID. This is different than the player ID
  playerID        : number;   // The player ID of the other user. This is different than the account ID
  username        : string;   // The username of the other user

  message         : string;   // The friend requests's message, encoded in base64
  age             : string;   // How long ago the friend request was sent (e.g. '2 months')
  newFriendRequest: boolean;  // if the friend request is new

  iconType        : number;   // The other user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider
  accColor        : number;   // The other user's primary player color, presumably ordered cronologically from left to right per update
  accColor2       : number;   // The other user's secondary player color, presumably ordered cronologically from left to right per update
  iconID          : number;   // Which icon the other user is using, starting with 1 as the first icon
  glow            : number;   // Either 0 or 2, might be related to glow
};
export const FriendRequestM: TR.KeyMap = {
  1 : 'username',
  2 : 'playerID',
  9 : 'iconID',
  10: 'accColor',
  11: 'accColor2',
  14: 'iconType',
  15: 'glow',
  16: 'accountID',
  32: 'friendRequestID',
  35: 'message',
  37: 'age',
  41: 'newFriendRequest',
};
