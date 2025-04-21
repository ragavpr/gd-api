export type GauntletInfo = {
  gauntletid : number // the Gauntlet ID, starting at 1
  levels     : string // List of gauntlet level IDs seperated by ,
}
export const GauntletInfo_Map = {
   1: "gauntletid",
   3: "levels",
}
