export type MapPack = {
  packid     : number // the ID for the specified Map Pack
  packname   : string // Name of the map pack
  levels     : string // List of level IDs separated by a ,
  stars      : number // How many stars the map pack should give
  coins      : number // How many coins the map pack should give
  difficulty : number // Difficulty ranging from 0->10
  textcolor  : string // RGB color for the title text separated by ,
  barcolor   : string // RGB color for the completion bar separated by ,
}
export const MapPack_Map = {
   1: "packid",
   2: "packname",
   3: "levels",
   4: "stars",
   5: "coins",
   6: "difficulty",
   7: "textcolor",
   8: "barcolor",
}
