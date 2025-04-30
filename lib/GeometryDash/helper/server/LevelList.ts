import { B64Dec, B64Enc } from '../../utils';
import * as TR from '../Serializers';

export type LevelList = {
  listID               : number;    // The id of the list
  listName             : string;    // The name of the list
  accountID            : number;    // The account ID of the list author
  username             : string;    // The username of the list author

  description          : string;    // The list description, encoded in base64
  version              : number;    // The version of the list published
  difficulty           : number;    // The difficulty face for the list. -1 = N/A, 0 = Auto, 1 = Easy, 2 = Normal, 3 = Hard, 4 = Harder, 5 = Insane, 6 = Easy Demon, 7 = Medium Demon, 8 = Hard Demon, 9 = Insane Demon, 10 = Extreme Demon
  rated                : boolean;   // If the list is rated or not
  
  downloads            : number;    // The amount of times the list has been downloaded
  likes                : number;    // likes - dislikes
  
  uploadDate           : Date;      // The Unix timestamp of when the list was uploaded
  updateDate           : Date;      // The Unix timestamp of when the list was last updated
  
  levelIDs             : number[];  // All level IDs in the list, separated by commas
  
  listReward           : number;    // The amount of diamonds awarded upon beating the required amount of levels in the list
  listRewardRequirement: number;    // The amount of levels needed to claim the list reward
};
export const LevelListSM: TR.SerializeMap = {
  default: TR.Number,
  2      : TR.NoSerializer,
  50     : TR.NoSerializer,
  3      : {
    decode: B64Dec,
    encode: B64Enc,
  },
  19     : TR.BooleanNum,
  28     : TR.DateTime,
  29     : TR.DateTime,
  51     : TR.NumberArray,
};

export const LevelListM: TR.KeyMap = {
  1 : 'listID',
  2 : 'listName',
  3 : 'description',
  5 : 'version',
  7 : 'difficulty',
  10: 'downloads',
  14: 'likes',
  19: 'rated',
  28: 'uploadDate',
  29: 'updateDate',
  49: 'accountID',
  50: 'username',
  51: 'levelIDs',
  55: 'listReward',
  56: 'listRewardRequirement',
};
