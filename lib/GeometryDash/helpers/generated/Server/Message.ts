export type Message = {
  messageid      : number  // The message ID
  accountid      : number  // The other user's account ID
  playerid       : number  // The other user's player ID
  title          : string  // The title encoded in Base64
  messagecontent : string  // The message which has been Xor'd with a key of 14251 and then encoded in base64
  username       : string  // The other user's username
  age            : string  // How long ago the message was sent (e.g. "2 months")
  read           : boolean // 0 if the message hasn't been read, 1 if it has
  sender         : boolean // 0 if the user is receiving the message, 1 if they sent it
}
export const Message_Map = {
   1: "messageid",
   2: "accountid",
   3: "playerid",
   4: "title",
   5: "messagecontent",
   6: "username",
   7: "age",
   8: "read",
   9: "sender",
}
