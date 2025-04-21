export type CommentUser = {
  username     : string // Author's username
  icon         : number // Which icon the player is using, starting with 1 as the first icon
  playerColor  : number // Author's primary player color, presumably ordered cronologically from left to right per update
  playerColor2 : number // Author's secondary player color, presumably ordered cronologically from left to right per update
  iconType     : number // Author's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider
  glow         : number // 0 = no glow, 2 = glow
  accountId    : number // Author's account ID. This is different than the player ID
}
export const CommentUser_Map = {
    1: "username",
    9: "icon",
   10: "playerColor",
   11: "playerColor",
   14: "iconType",
   15: "glow",
   16: "accountId",
}
