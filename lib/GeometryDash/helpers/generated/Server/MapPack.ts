import * as TR from "../../Serializers"

export type MapPack = {
  packID     : number // the ID for the specified Map Pack
  packName   : string // Name of the map pack
  levels     : string // List of level IDs separated by a ,
  stars      : number // How many stars the map pack should give
  coins      : number // How many coins the map pack should give
  difficulty : number // Difficulty ranging from 0->10
  textColor  : string // RGB color for the title text separated by ,
  barColor   : string // RGB color for the completion bar separated by ,
}
export const MapPackM: TR.KeyMap = {
   1: "packID",
   2: "packName",
   3: "levels",
   4: "stars",
   5: "coins",
   6: "difficulty",
   7: "textColor",
   8: "barColor",
}
