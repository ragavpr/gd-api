export type LeaderboardLevel = {
  username     : string // The username of the user
  playerId     : number // The player ID of the user. This is different than the account ID
  percentage   : number // Percentage the user has on the level. If the level is platformer, this is the time in milliseconds instead
  ranking      : number // What rank they are (e.g. Viprin would have 1 in the creating leaderboard)
  icon         : number // Which icon the user is using, starting with 1 as the first icon
  playerColor  : number // The user's primary player color, presumably ordered cronologically from left to right per update
  playerColor2 : number // The user's secondary player color, presumably ordered cronologically from left to right per update
  coins        : number // Number of usercoins you get on a level
  iconType     : number // The user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider, swing, jetpack
  special      : number // functions the same as glow however it returns a 2 rather than a 1
  accountId    : number // The user's account ID. This is different than the player ID
  age          : string // How long ago the score was set (e.g. "2 months")
}
export const LeaderboardLevel_Map = {
    1: "username",
    2: "playerId",
    3: "percentage",
    6: "ranking",
    9: "icon",
   10: "playerColor",
   11: "playerColor2",
   13: "coins",
   14: "iconType",
   15: "special",
   16: "accountId",
   42: "age",
}
