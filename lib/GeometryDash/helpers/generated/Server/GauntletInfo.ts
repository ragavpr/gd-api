export type GauntletInfo = {
  gauntletId : number // the Gauntlet ID, starting at 1
  levels     : number[] // List of gauntlet level IDs seperated by ,
}
export const GauntletInfo_Map = {
   1: "gauntletId",
   3: "levels",
}
