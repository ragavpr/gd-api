import * as TR from '../Serializers';

export type User = {
  accountID          ?: number;    // The accountid of this player
  playerID           ?: number;    // The ID of player
  username           ?: string;    // The name of player

  demons             ?: number;    // The count of demons player have
  stars              ?: number;    // The count of stars player have
  moons              ?: number;    // The amount of moons the player has
  secretCoins        ?: number;    // The count of coins player have
  userCoins          ?: number;    // The count of usercoins player have
  diamonds           ?: number;    // The count of diamonds player have
  creatorPoints      ?: number;    // The count of creatorpoints player have
  age                ?: Date;      // the time since you submitted a levelScore

  accountHighlight   ?: number;    // The accountID of the player. Is used for highlighting the player on the leaderboards
  globalRank         ?: number;    // The global rank of this player
  ranking            ?: number;    // the global leaderboard position of the player
  messageState       ?: number;    // 0: All, 1: Only friends, 2: None
  friendsState       ?: number;    // 0: All, 1: None

  iconType           ?: number;    // The iconType of the player use
  accColor           ?: number;    // First color of the player use
  accColor2          ?: number;    // Second color of the player use
  accColor3          ?: number;    // The ID of the player's glow color
  iconID             ?: number;    // maybe... link
  glow               ?: number;    // The special number of the player use
  accIcon            ?: number;    // The icon number of the player use
  accShip            ?: number;    // The ship number of the player use
  accBall            ?: number;    // The ball number of the player use
  accBird            ?: number;    // The bird number of the player use
  accDart            ?: number;    // The dart(wave) number of the player use
  accRobot           ?: number;    // The robot number of the player use
  accStreak          ?: number;    // The streak of the user
  accGlow            ?: number;    // The glow number of the player use
  accSpider          ?: number;    // The spider number of the player use
  accSwing           ?: number;    // The player's swing
  accJetpack         ?: number;    // The player's jetpack
  accExplosion       ?: number;    // The explosion number of the player use

  friendState        ?: number;    // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
  messages           ?: number;    // How many new messages the user has (shown in-game as a notification)
  newFriends         ?: number;    // How many new Friends the user has (shown in-game as a notificaiton)
  friendRequests     ?: number;    // How many new friend requests the user has (shown in-game as a notificaiton)
  newFriendRequest   ?: boolean;   // appears on userlist endpoint to show if the friend request is new
  commentHistoryState?: number;    // 0: All, 1: Only friends, 2: None

  youtube            ?: string;    // The youtubeurl of player
  twitter            ?: string;    // The twitter of player
  twitch             ?: string;    // The twitch of player

  isRegistered       ?: number;    // if an account is registered or not
  modLevel           ?: number;    // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)

  demonStat          ?: number[];  // Breakdown of the player's demons, in the format {easy},{medium},{hard}.{insane},{extreme},{easyPlatformer},{mediumPlatformer},{hardPlatformer},{insanePlatformer},{extremePlatformer},{weekly},{gauntlet}
  classicStat        ?: number[];  // Breakdown of the player's classic mode non-demons, in the format {auto},{easy},{normal},{hard},{harder},{insane},{daily},{gauntlet}
  platformerStat     ?: number[];  // Breakdown of the player's platformer mode non-demons, in the format {auto},{easy},{normal},{hard},{harder},{insane}
} & Record<string, any>;

export const UserSM: TR.SerializeMap = {
  default: TR.Number,
  1      : TR.NoSerializer,
  20     : TR.NoSerializer,
  44     : TR.NoSerializer,
  45     : TR.NoSerializer,
  55     : TR.NumberArray,
  56     : TR.NumberArray,
  57     : TR.NumberArray,
};

export const UserM: TR.KeyMap = {
  1 : 'username',
  2 : 'playerID',
  3 : 'stars',
  4 : 'demons',
  6 : 'ranking',
  7 : 'accountHighlight',
  8 : 'creatorPoints',
  9 : 'iconID',
  10: 'accColor',
  11: 'accColor2',
  13: 'secretCoins',
  14: 'iconType',
  15: 'glow',
  16: 'accountID',
  17: 'userCoins',
  18: 'messageState',
  19: 'friendsState',
  20: 'youtube',
  21: 'accIcon',
  22: 'accShip',
  23: 'accBall',
  24: 'accBird',
  25: 'accDart',
  26: 'accRobot',
  27: 'accStreak',
  28: 'accGlow',
  29: 'isRegistered',
  30: 'globalRank',
  31: 'friendState',
  38: 'messages',
  39: 'friendRequests',
  40: 'newFriends',
  41: 'newFriendRequest',
  42: 'age',
  43: 'accSpider',
  44: 'twitter',
  45: 'twitch',
  46: 'diamonds',
  48: 'accExplosion',
  49: 'modLevel',
  50: 'commentHistoryState',
  51: 'accColor3',
  52: 'moons',
  53: 'accSwing',
  54: 'accJetpack',
  55: 'demonStat',
  56: 'classicStat',
  57: 'platformerStat',
};
