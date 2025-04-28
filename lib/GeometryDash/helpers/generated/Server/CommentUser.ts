import * as TR from "../../Serializers"

enum Glow {
  None = 0,
  Glow = 2
}
export type CommentUser = {
  accountID    : number // Author's account ID. This is different than the player ID
  username     : string // Author's username
  
  iconType     : number // Author's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider
  accColor     : number // Author's primary player color, presumably ordered cronologically from left to right per update
  accColor2    : number // Author's secondary player color, presumably ordered cronologically from left to right per update
  iconID       : number // Which icon the player is using, starting with 1 as the first icon
  glow         : Glow   // 0 = no glow, 2 = glow
}
export const CommentUserM: TR.KeyMap = {
    1: "username",
    9: "iconID",
   10: "accColor",
   11: "accColor",
   14: "iconType",
   15: "glow",
   16: "accountID",
}
