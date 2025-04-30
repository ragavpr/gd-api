export type AudioSfxLib = {
  id           : number  // The sound effect/folder ID
  name         : string  // The sound effect/folder name
  isfolder     : boolean // Whether this is a sound effect or folder
  parentfolder : number  // The parent folder
  filesize     : number  // The sound effect file size in bytes
  duration     : number  // The duration of the sound effect, in seconds * 100
}
export const AudioSfxLib_Map = {
   0: 'id',
   1: 'name',
   2: 'isfolder',
   3: 'parentfolder',
   4: 'filesize',
   5: 'duration',
}
