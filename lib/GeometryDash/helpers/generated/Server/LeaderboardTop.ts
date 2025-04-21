export type LeaderboardTop = {
  username      : string       // The username of the user
  playerid      : number       // The player ID of the user. This is different than the account ID
  stars         : number       // The amount of stars the player has
  demons        : unidentified // The amount of demons the player has
  ranking       : number       // What rank they are (e.g. Viprin would have 1 in the creating leaderboard)
  creatorpoints : number       // The amount of creator points the player has
  icon          : number       // Which icon the user is using, starting with 1 as the first icon
  playercolor   : number       // The user's primary player color, presumably ordered cronologically from left to right per update
  playercolor2  : number       // The user's secondary player color, presumably ordered cronologically from left to right per update
  coins         : number       // Secret coins
  icontype      : number       // The user's icon type indexing an array of icon, ship, ball, ufo, wave, robot, spider, swing, jetpack
  special       : number       // functions the same as glow however it returns a 2 rather than a 1
  accountid     : number       // The user's account ID. This is different than the player ID
  usercoins     : number       // The amount of user coins the player has
  diamonds      : number       // The amount of diamonds the player has
  moons         : number       // The amount of moons the player has
}
export const LeaderboardTop_Map = {
    1: "username",
    2: "playerid",
    3: "stars",
    4: "demons",
    6: "ranking",
    8: "creatorpoints",
    9: "icon",
   10: "playercolor",
   11: "playercolor2",
   13: "coins",
   14: "icontype",
   15: "special",
   16: "accountid",
   17: "usercoins",
   46: "diamonds",
   52: "moons",
}
