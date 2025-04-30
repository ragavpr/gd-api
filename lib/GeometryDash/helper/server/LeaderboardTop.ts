import * as TR from "../Serializers"

//Subset of User
export type LeaderboardTop = {
  accountID     : number // The user's account ID. This is different than the player ID
  playerID      : number // The player ID of the user. This is different than the account ID
  username      : string // The username of the user

  demons        : number // The amount of demons the player has
  stars         : number // The amount of stars the player has
  moons         : number // The amount of moons the player has
  secretCoins   : number // Secret coins
  userCoins     : number // The amount of user coins the player has
  diamonds      : number // The amount of diamonds the player has
  creatorPoints : number // The amount of creator points the player has
  
  ranking       : number // What rank they are (e.g. Viprin would have 1 in the creating leaderboard)
  
  iconType      : number // The user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider, swing, jetpack
  accColor      : number // The user's primary player color, presumably ordered cronologically from left to right per update
  accColor2     : number // The user's secondary player color, presumably ordered cronologically from left to right per update
  iconID        : number // Which icon the user is using, starting with 1 as the first icon
  glow          : number // functions the same as glow however it returns a 2 rather than a 1
}

export const LeaderboardTopM: TR.KeyMap = {
    1: "username",
    2: "playerID",
    3: "stars",
    4: "demons",
    6: "ranking",
    8: "creatorPoints",
    9: "iconID",
   10: "accColor",
   11: "accColor2",
   13: "secretCoins",
   14: "iconType",
   15: "glow",
   16: "accountID",
   17: "userCoins",
   46: "diamonds",
   52: "moons",
}
