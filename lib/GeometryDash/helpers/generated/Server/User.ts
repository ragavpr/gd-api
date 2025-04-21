export type User = {
  username            : string  // The name of player
  userid              : number  // The ID of player
  stars               : number  // The count of stars player have
  demons              : number  // The count of demons player have
  ranking             : number  // the global leaderboard position of the player
  accounthighlight    : number  // The accountID of the player. Is used for highlighting the player on the leaderboards
  creatorpoints       : number  // The count of creatorpoints player have
  iconid              : number  // maybe... link
  color               : number  // First color of the player use
  color2              : number  // Second color of the player use
  secretcoins         : number  // The count of coins player have
  icontype            : number  // The iconType of the player use
  special             : number  // The special number of the player use
  accountid           : number  // The accountid of this player
  usercoins           : number  // The count of usercoins player have
  messagestate        : number  // 0: All, 1: Only friends, 2: None
  friendsstate        : number  // 0: All, 1: None
  youtube             : string  // The youtubeurl of player
  accicon             : number  // The icon number of the player use
  accship             : number  // The ship number of the player use
  accball             : number  // The ball number of the player use
  accbird             : number  // The bird number of the player use
  accdart(wave)       : number  // The dart(wave) number of the player use
  accrobot            : number  // The robot number of the player use
  accstreak           : number  // The streak of the user
  accglow             : number  // The glow number of the player use
  isregistered        : number  // if an account is registered or not
  globalrank          : number  // The global rank of this player
  friendstate         : number  // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
  messages            : number  // How many new messages the user has (shown in-game as a notification)
  friendrequests      : number  // How many new friend requests the user has (shown in-game as a notificaiton)
  newfriends          : number  // How many new Friends the user has (shown in-game as a notificaiton)
  newfriendrequest    : boolean // appears on userlist endpoint to show if the friend request is new
  age                 : string  // the time since you submitted a levelScore
  accspider           : number  // The spider number of the player use
  twitter             : string  // The twitter of player
  twitch              : string  // The twitch of player
  diamonds            : number  // The count of diamonds player have
  accexplosion        : number  // The explosion number of the player use
  modlevel            : number  // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)
  commenthistorystate : number  // 0: All, 1: Only friends, 2: None
  color3              : number  // The ID of the player's glow color
  moons               : number  // The amount of moons the player has
  accswing            : number  // The player's swing
  accjetpack          : number  // The player's jetpack
  demons              : string  // Breakdown of the player's demons, in the format {easy},{medium},{hard}.{insane},{extreme},{easyPlatformer},{mediumPlatformer},{hardPlatformer},{insanePlatformer},{extremePlatformer},{weekly},{gauntlet}
  classiclevels       : string  // Breakdown of the player's classic mode non-demons, in the format {auto},{easy},{normal},{hard},{harder},{insane},{daily},{gauntlet}
  platformerlevels    : string  // Breakdown of the player's platformer mode non-demons, in the format {auto},{easy},{normal},{hard},{harder},{insane}
}
export const User_Map = {
    1: "username",
    2: "userid",
    3: "stars",
    4: "demons",
    6: "ranking",
    7: "accounthighlight",
    8: "creatorpoints",
    9: "iconid",
   10: "color",
   11: "color2",
   13: "secretcoins",
   14: "icontype",
   15: "special",
   16: "accountid",
   17: "usercoins",
   18: "messagestate",
   19: "friendsstate",
   20: "youtube",
   21: "accicon",
   22: "accship",
   23: "accball",
   24: "accbird",
   25: "accdart(wave)",
   26: "accrobot",
   27: "accstreak",
   28: "accglow",
   29: "isregistered",
   30: "globalrank",
   31: "friendstate",
   38: "messages",
   39: "friendrequests",
   40: "newfriends",
   41: "newfriendrequest",
   42: "age",
   43: "accspider",
   44: "twitter",
   45: "twitch",
   46: "diamonds",
   48: "accexplosion",
   49: "modlevel",
   50: "commenthistorystate",
   51: "color3",
   52: "moons",
   53: "accswing",
   54: "accjetpack",
   55: "demons",
   56: "classiclevels",
   57: "platformerlevels",
}
