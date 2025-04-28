import * as TR from "../../Serializers"

export type Restore = {
  officialLevels : string // Please refer to Official Level Structure
  stars          : number // This is how many stars that should be given to your account
  demons         : number // This is how many demons that should be added to your account
  jumps          : number // This is how many jumps you have made on your account of its lifetime
  attempts       : number // This is how many attempts you have spent on levels on your accounts lifetime
  onlineLevels   : string // These are the ID's of online levels you have beaten. seperated by ,
}
export const RestoreM: TR.KeyMap = {
   1: "officialLevels",
   2: "stars",
   3: "demons",
   4: "jumps",
   5: "attempts",
   6: "onlineLevels",
}
