import * as TR from '../Serializers';

export type Comment = {
  messageID         : number;   // The message ID. Account comments have different IDs than level comments
  authorAccountID   : number;   // The accountID of the comment author
  authorPlayerID    : number;   // The player ID of the comment author
  levelID           : number;   // The levelID linked to the comment. This ID is negative if the comment is on a list

  comment           : string;   // The comment left by the user, encoded in base64
  percent           : number;   // The percent the player put in their comment. Also doesn't apply to List Comments
  
  likes             : number;   // The amount of likes the comment has
  dislikes          : number;   // The amount of dislikes the comment has -> unused
  age               : Date;     // How long ago the comment was posted (e.g. '2 months')
  
  spam              : boolean;  // If a comment has been flagged as spam
  modBadge          : number;   // The Mod Badge of a moderator commenting
  moderatorChatColor: string;   // Comma separated list of the RGB values of the moderator's chat color - only appears if the players modBadge > 0
};
export const CommentM: TR.KeyMap = {
  1 : 'levelID',
  2 : 'comment',
  3 : 'authorPlayerID',
  4 : 'likes',
  5 : 'dislikes',
  6 : 'messageID',
  7 : 'spam',
  8 : 'authorAccountID',
  9 : 'age',
  10: 'percent',
  11: 'modBadge',
  12: 'moderatorChatColor',
};
