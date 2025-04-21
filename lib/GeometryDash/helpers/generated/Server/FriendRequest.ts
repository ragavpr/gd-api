export type FriendRequest = {
  username         : string  // The username of the other user
  playerid         : number  // The player ID of the other user. This is different than the account ID
  icon             : number  // Which icon the other user is using, starting with 1 as the first icon
  playercolor      : number  // The other user's primary player color, presumably ordered cronologically from left to right per update
  playercolor2     : number  // The other user's secondary player color, presumably ordered cronologically from left to right per update
  icontype         : number  // The other user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider
  glow             : number  // Either 0 or 2, might be related to glow
  accountid        : number  // The other user's account ID. This is different than the player ID
  friendrequestid  : number  // An ID unique to each friend request. (I'm not 100% certain on this)
  message          : string  // The friend requests's message, encoded in base64
  age              : string  // How long ago the friend request was sent (e.g. "2 months")
  newfriendrequest : boolean // if the friend request is new
}
export const FriendRequest_Map = {
    1: "username",
    2: "playerid",
    9: "icon",
   10: "playercolor",
   11: "playercolor2",
   14: "icontype",
   15: "glow",
   16: "accountid",
   32: "friendrequestid",
   35: "message",
   37: "age",
   41: "newfriendrequest",
}
