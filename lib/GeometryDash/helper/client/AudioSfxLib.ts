import * as TR from '../Serializers';

export type ItemSfx = {
  sfxID       : number;   // The sound effect/folder ID
  name        : string;   // The sound effect/folder name
  isFolder    : boolean;  // Whether this is a sound effect or folder
  parentFolder: number;   // The parent folder
  fileSize    : number;   // The sound effect file size in bytes
  duration    : number;   // The duration of the sound effect, in seconds * 100
};
export const ItemSfxSM = {
  default: TR.Number,
  1      : TR.NoSerializer,
  2      : TR.BooleanNum,
};
export const ItemSfxM = {
  0: 'sfxID',
  1: 'name',
  2: 'isFolder',
  3: 'parentFolder',
  4: 'fileSize',
  5: 'duration',
};

export type CreditSfx = {
  name: string;
  link: string;
};

export const CreditSfxSM = {};
export const CreditSfxM  = {
  0: 'name',
  1: 'link',
};
