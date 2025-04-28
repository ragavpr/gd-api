import * as TR from "../../Serializers";

type LevelString = string
export type Level = {
  levelID                : number       // The id of the level
  levelName              : string       // The name of the level
  playerID               : number       // The player ID of the level author
  description            : string       // The level description, encoded in base64
  version                : number       // The version of the level published
  gameVersion            : number       // The GD version the level was uploaded in. Versions 1.0 to 1.6 use version numbers 1 to 7 respectively. Version 10 is 1.7. Otherwise, divide the version number by ten to get the correct number.

  length                 : number       // A number from 0-4, where 0 is tiny and 4 is XL
  difficultyDenominator  : number       // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned. Historically used to be the amount of people who have voted on the difficulty.
  difficultyNumerator    : number       // The nominator used for calculating the level difficulty. Divided by the denominator to get the difficulty icon. Nowadays just 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane. Can be also used to determine the demon difficulty as a side-effect of the voting system. Historically used to be the sum of stars from all votes
  demon                  : boolean      // If the level's difficulty is demon
  demonDifficulty        : number       // The difficulty of the demon rating. 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme. Can also be used to determine the level difficulty non-demons had before rating as a side-effect of the voting system.
  twoPlayer              : boolean      // Whether the level uses two player mode
  auto                   : boolean      // If the level's difficulty is auto
  starsRequested         : number       // The star value requested for the level
  stars                  : number       // The amount of stars rewarded for completing the level
  coins                  : number       // The number of user coins placed in the level
  verifiedCoins          : boolean      // If the level's user coins are verified (silver)

  uploadDate             : string       // The approximate date the level was uploaded on
  updateDate             : string       // The approximate date the level was last updated on

  featureScore           : number       // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
  epic                   : number       // The epic rating for the level. 0 = none, 1 = epic, 2 = legendary, 3 = mythic.
  isGauntlet             : boolean      // if the level is in a gauntlet
  dailyNumber            : number       // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
  downloads              : number       // The amount of times the level has been downloaded
  setCompletes           : number       // The Number of people who have completed a specific level removed in update 2.1
  likes                  : number       // likes - dislikes
  dislikes               : number       // dislikes - likes

  levelString            : LevelString  // All the data for the level

  officialSong           : number       // The official song number used by the level, if applicable
  customSongID           : number       // The ID of the custom Newgrounds song used in the level
  songIDs                : number[]     // The list of all song IDs in the level, separated by commas
  sfxIDs                 : number[]     // The list of all SFX IDs in the level, separated by commas

  password               : number       // The password required to copy the level. It is XOR encrypted with a key of 26364
  copiedID               : number       // The ID the of the original level (if the level was copied)
  objects                : number       // The amount of objects in the level, used to determine if the level is considered "large". It caps at 65535
  editorTime             : number       // the total number of seconds spend on the current copy of a level
  editorTimeCumulative   : number       // The accumulative total of seconds spend on previous copies of the level
  verificationTime       : number       // How long the level took to verify (in frames, assume 240 FPS)
  lowDetailMode          : boolean      // If the level has a low detail checkbox

  recordString           : string       // appears in the GJGameLevel parser but is unused
  extraString            : string       // The extraString passed when uploading the level. Its use is currently unknown
  settingsString         : string       // It was found in early 2.1 coming from the servers and was removed shortly after. The December 2019 2.2 Leaks however have information regarding it showing that it is called settingsString but, there is no information regarding its usage
  unknown                : number       // Unknown value, perhaps robtop-only? (corresponds to k106 in the save file)
}

export const LevelSM: TR.SerializeMap = {
  "default": TR.Number,
  2: TR.NoSerializer,
  3: TR.NoSerializer,
  17: TR.Boolean,
  31: TR.Boolean,
  25: TR.Boolean,
  38: TR.Boolean,
  28: TR.NoSerializer,
  29: TR.NoSerializer,
  44: TR.Boolean,
  4: TR.NoSerializer,
  52: TR.NumberArray,
  53: TR.NumberArray,
  40: TR.Boolean,
  26: TR.NoSerializer,
  36: TR.NoSerializer,
  48: TR.NoSerializer,
}

export const LevelM: TR.KeyMap = {
     1: "levelID",
     2: "levelName",
     3: "description",
     4: "levelString",
     5: "version",
     6: "playerID",
     8: "difficultyDenominator",
     9: "difficultyNumerator",
    10: "downloads",
    11: "setCompletes",
    12: "officialSong",
    13: "gameVersion",
    14: "likes",
    15: "length",
    16: "dislikes",
    17: "demon",
    18: "stars",
    19: "featureScore",
    25: "auto",
    26: "recordString",
    27: "password",
    28: "uploadDate",
    29: "updateDate",
    30: "copiedID",
    31: "twoPlayer",
    35: "customSongID",
    36: "extraString",
    37: "coins",
    38: "verifiedCoins",
    39: "starsRequested",
    40: "lowDetailMode",
    41: "dailyNumber",
    42: "epic",
    43: "demonDifficulty",
    44: "isGauntlet",
    45: "objects",
    46: "editorTime",
    47: "editorTimeCumulative",
    48: "settingsString",
    52: "songIDs",
    53: "sfxIDs",
    54: "unknown",
    57: "verificationTime",
}
