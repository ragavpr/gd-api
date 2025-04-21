export type Comment = {
  levelid             : number  // The levelID linked to the comment. This ID is negative if the comment is on a list
  comment             : string  // The comment left by the user, encoded in base64
  authorplayerid      : number  // The player ID of the comment author
  likes               : number  // The amount of likes the comment has
  dislikes            : number  // The amount of dislikes the comment has -> unused
  messageid           : number  // The message ID. Account comments have different IDs than level comments
  spam                : boolean // If a comment has been flagged as spam
  authoraccountid     : number  // The accountID of the comment author
  age                 : string  // How long ago the comment was posted (e.g. "2 months")
  percent*            : number  // The percent the player put in their comment. Also doesn't apply to List Comments
  modbadge*           : number  // The Mod Badge of a moderator commenting
  moderatorchatcolor* : string  // Comma separated list of the RGB values of the moderator's chat color - only appears if the players modBadge > 0
}
export const Comment_Map = {
    1: "levelid",
    2: "comment",
    3: "authorplayerid",
    4: "likes",
    5: "dislikes",
    6: "messageid",
    7: "spam",
    8: "authoraccountid",
    9: "age",
   10: "percent*",
   11: "modbadge*",
   12: "moderatorchatcolor*",
}
