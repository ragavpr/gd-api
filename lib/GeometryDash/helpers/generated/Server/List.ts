export type List = {
  listid                : number       // The id of the list
  listname              : string       // The name of the list
  description           : string       // The list description, encoded in base64
  version               : number       // The version of the list published
  difficulty            : number       // The difficulty face for the list. -1 = N/A, 0 = Auto, 1 = Easy, 2 = Normal, 3 = Hard, 4 = Harder, 5 = Insane, 6 = Easy Demon, 7 = Medium Demon, 8 = Hard Demon, 9 = Insane Demon, 10 = Extreme Demon
  downloads             : number       // The amount of times the list has been downloaded
  likes                 : number       // likes - dislikes
  rated                 : boolean      // If the list is rated or not
  uploaddate            : string       // The Unix timestamp of when the list was uploaded
  updatedate            : string       // The Unix timestamp of when the list was last updated
  accountid             : number       // The account ID of the list author
  username              : string       // The username of the list author
  levelids              : unidentified // All level IDs in the list, separated by commas
  listreward            : number       // The amount of diamonds awarded upon beating the required amount of levels in the list
  listrewardrequirement : number       // The amount of levels needed to claim the list reward
}
export const List_Map = {
    1: "listid",
    2: "listname",
    3: "description",
    5: "version",
    7: "difficulty",
   10: "downloads",
   14: "likes",
   19: "rated",
   28: "uploaddate",
   29: "updatedate",
   49: "accountid",
   50: "username",
   51: "levelids",
   55: "listreward",
   56: "listrewardrequirement",
}
