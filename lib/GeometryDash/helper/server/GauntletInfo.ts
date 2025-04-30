import * as TR from '../Serializers';

export type GauntletInfo = {
  gauntletID: number;    // the Gauntlet ID, starting at 1
  levelIDs  : number[];  // List of gauntlet level IDs seperated by ,
};

export const GauntletInfoSM: TR.SerializeMap = {
  1: TR.Number,
  3: TR.NumberArray,
};

export const GauntletInfoM: TR.KeyMap = {
  1: 'gauntletID',
  3: 'levelIDs',
};
