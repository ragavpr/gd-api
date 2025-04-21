export type Level = {
  levelId                : number       // The id of the level
  levelName              : string       // The name of the level
  description            : string       // The level description, encoded in base64
  levelString            : unidentified // All the data for the level
  version                : number       // The version of the level published
  playerId               : number       // The player ID of the level author
  difficultyDenominator  : number       // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned. Historically used to be the amount of people who have voted on the difficulty.
  difficultyNumerator    : number       // The nominator used for calculating the level difficulty. Divided by the denominator to get the difficulty icon. Nowadays just 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane. Can be also used to determine the demon difficulty as a side-effect of the voting system. Historically used to be the sum of stars from all votes
  downloads              : number       // The amount of times the level has been downloaded
  setCompletes           : number       // The Number of people who have completed a specific level removed in update 2.1
  officialSong           : number       // The official song number used by the level, if applicable
  gameVersion            : number       // The GD version the level was uploaded in. Versions 1.0 to 1.6 use version numbers 1 to 7 respectively. Version 10 is 1.7. Otherwise, divide the version number by ten to get the correct number.
  likes                  : number       // likes - dislikes
  length                 : number       // A number from 0-4, where 0 is tiny and 4 is XL
  dislikes               : number       // dislikes - likes
  demon                  : boolean      // If the level's difficulty is demon
  stars                  : number       // The amount of stars rewarded for completing the level
  featureScore           : number       // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
  auto                   : boolean      // If the level's difficulty is auto
  recordString           : string       // appears in the GJGameLevel parser but is unused
  password               : unidentified // The password required to copy the level. It is XOR encrypted with a key of 26364
  uploadDate             : string       // The approximate date the level was uploaded on
  updateDate             : string       // The approximate date the level was last updated on
  copiedId               : number       // The ID the of the original level (if the level was copied)
  twoPlayer              : boolean      // Whether the level uses two player mode
  customSongId           : number       // The ID of the custom Newgrounds song used in the level
  extraString            : string       // The extraString passed when uploading the level. Its use is currently unknown
  coins                  : number       // The number of user coins placed in the level
  verifiedCoins          : boolean      // If the level's user coins are verified (silver)
  starsRequested         : number       // The star value requested for the level
  lowDetailMode          : boolean      // If the level has a low detail checkbox
  dailyNumber            : number       // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
  epic                   : number       // The epic rating for the level. 0 = none, 1 = epic, 2 = legendary, 3 = mythic.
  demonDifficulty        : number       // The difficulty of the demon rating. 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme. Can also be used to determine the level difficulty non-demons had before rating as a side-effect of the voting system.
  isGauntlet             : boolean      // if the level is in a gauntlet
  objects                : number       // The amount of objects in the level, used to determine if the level is considered "large". It caps at 65535
  editorTime             : number       // the total number of seconds spend on the current copy of a level
  editorTimeCumulative   : number       // The accumulative total of seconds spend on previous copies of the level
  settingsString         : string       // It was found in early 2.1 coming from the servers and was removed shortly after. The December 2019 2.2 Leaks however have information regarding it showing that it is called settingsString but, there is no information regarding its usage
  songIds                : unidentified // The list of all song IDs in the level, separated by commas
  sfxIds                 : unidentified // The list of all SFX IDs in the level, separated by commas
  unknown                : number       // Unknown value, perhaps robtop-only? (corresponds to k106 in the save file)
  verificationTime       : number       // How long the level took to verify (in frames, assume 240 FPS)
}
export const Level_Map = {
     1: "levelId",
     2: "levelName",
     3: "description",
    4*: "levelString",
     5: "version",
     6: "playerId",
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
   27*: "password",
   28*: "uploadDate",
   29*: "updateDate",
    30: "copiedId",
    31: "twoPlayer",
    35: "customSongId",
    36: "extraString",
    37: "coins",
    38: "verifiedCoins",
    39: "starsRequested",
   40*: "lowDetailMode",
   41*: "dailyNumber",
    42: "epic",
    43: "demonDifficulty",
    44: "isGauntlet",
    45: "objects",
    46: "editorTime",
    47: "editorTimeCumulative",
    48: "settingsString",
   52*: "songIds",
   53*: "sfxIds",
    54: "unknown",
   57*: "verificationTime",
}
