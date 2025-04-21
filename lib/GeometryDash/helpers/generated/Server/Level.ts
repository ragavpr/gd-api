export type Level = {
  levelid                : number       // The id of the level
  levelname              : string       // The name of the level
  description            : string       // The level description, encoded in base64
  levelstring            : unidentified // All the data for the level
  version                : number       // The version of the level published
  playerid               : number       // The player ID of the level author
  difficultydenominator  : number       // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned. Historically used to be the amount of people who have voted on the difficulty.
  difficultynumerator    : number       // The nominator used for calculating the level difficulty. Divided by the denominator to get the difficulty icon. Nowadays just 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane. Can be also used to determine the demon difficulty as a side-effect of the voting system. Historically used to be the sum of stars from all votes
  downloads              : number       // The amount of times the level has been downloaded
  setcompletes           : number       // The Number of people who have completed a specific level removed in update 2.1
  officialsong           : number       // The official song number used by the level, if applicable
  gameversion            : number       // The GD version the level was uploaded in. Versions 1.0 to 1.6 use version numbers 1 to 7 respectively. Version 10 is 1.7. Otherwise, divide the version number by ten to get the correct number.
  likes                  : number       // likes - dislikes
  length                 : number       // A number from 0-4, where 0 is tiny and 4 is XL
  dislikes               : number       // dislikes - likes
  demon                  : boolean      // If the level's difficulty is demon
  stars                  : number       // The amount of stars rewarded for completing the level
  featurescore           : number       // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
  auto                   : boolean      // If the level's difficulty is auto
  recordstring           : string       // appears in the GJGameLevel parser but is unused
  password               : unidentified // The password required to copy the level. It is XOR encrypted with a key of 26364
  uploaddate             : string       // The approximate date the level was uploaded on
  updatedate             : string       // The approximate date the level was last updated on
  copiedid               : number       // The ID the of the original level (if the level was copied)
  twoplayer              : boolean      // Whether the level uses two player mode
  customsongid           : number       // The ID of the custom Newgrounds song used in the level
  extrastring            : string       // The extraString passed when uploading the level. Its use is currently unknown
  coins                  : number       // The number of user coins placed in the level
  verifiedcoins          : boolean      // If the level's user coins are verified (silver)
  starsrequested         : number       // The star value requested for the level
  lowdetailmode          : boolean      // If the level has a low detail checkbox
  dailynumber            : number       // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
  epic                   : number       // The epic rating for the level. 0 = none, 1 = epic, 2 = legendary, 3 = mythic.
  demondifficulty        : number       // The difficulty of the demon rating. 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme. Can also be used to determine the level difficulty non-demons had before rating as a side-effect of the voting system.
  isgauntlet             : boolean      // if the level is in a gauntlet
  objects                : number       // The amount of objects in the level, used to determine if the level is considered "large". It caps at 65535
  editortime             : number       // the total number of seconds spend on the current copy of a level
  editortime(copies)     : number       // The accumulative total of seconds spend on previous copies of the level
  settingsstring[unused] : string       // It was found in early 2.1 coming from the servers and was removed shortly after. The December 2019 2.2 Leaks however have information regarding it showing that it is called settingsString but, there is no information regarding its usage
  songids                : unidentified // The list of all song IDs in the level, separated by commas
  sfxids                 : unidentified // The list of all SFX IDs in the level, separated by commas
  unknown                : number       // Unknown value, perhaps robtop-only? (corresponds to k106 in the save file)
  verificationtime       : number       // How long the level took to verify (in frames, assume 240 FPS)
}
export const Level_Map = {
     1: "levelid",
     2: "levelname",
     3: "description",
    4*: "levelstring",
     5: "version",
     6: "playerid",
     8: "difficultydenominator",
     9: "difficultynumerator",
    10: "downloads",
    11: "setcompletes",
    12: "officialsong",
    13: "gameversion",
    14: "likes",
    15: "length",
    16: "dislikes",
    17: "demon",
    18: "stars",
    19: "featurescore",
    25: "auto",
    26: "recordstring",
   27*: "password",
   28*: "uploaddate",
   29*: "updatedate",
    30: "copiedid",
    31: "twoplayer",
    35: "customsongid",
    36: "extrastring",
    37: "coins",
    38: "verifiedcoins",
    39: "starsrequested",
   40*: "lowdetailmode",
   41*: "dailynumber",
    42: "epic",
    43: "demondifficulty",
    44: "isgauntlet",
    45: "objects",
    46: "editortime",
    47: "editortime(copies)",
    48: "settingsstring[unused]",
   52*: "songids",
   53*: "sfxids",
    54: "unknown",
   57*: "verificationtime",
}
