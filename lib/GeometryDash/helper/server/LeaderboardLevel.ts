import * as TR from "../Serializers"

//Subset of User
export type LeaderboardLevel = {
  accountID    : number // The user's account ID. This is different than the player ID
  playerID     : number // The player ID of the user. This is different than the account ID
  username     : string // The username of the user
  
  secretCoins  : number // Number of usercoins you get on a level
  age          : string // How long ago the score was set (e.g. "2 months")
  
  percentage   : number // Percentage the user has on the level. If the level is platformer, this is the time in milliseconds instead
  ranking      : number // What rank they are (e.g. Viprin would have 1 in the creating leaderboard)
  
  iconType     : number // The user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider, swing, jetpack
  accColor     : number // The user's primary player color, presumably ordered cronologically from left to right per update
  accColor2    : number // The user's secondary player color, presumably ordered cronologically from left to right per update
  iconID       : number // Which icon the user is using, starting with 1 as the first icon
  glow         : number // functions the same as glow however it returns a 2 rather than a 1
}
export const LeaderboardLevelM: TR.KeyMap = {
    1: "username",
    2: "playerID",
    3: "percentage",
    6: "ranking",
    9: "iconID",
   10: "accColor",
   11: "accColor2",
   13: "secretCoins",
   14: "iconType",
   15: "glow",
   16: "accountID",
   42: "age",
}
