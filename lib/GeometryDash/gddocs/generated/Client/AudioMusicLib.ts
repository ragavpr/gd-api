export type AudioMusicLib = {
  id            : number  // The song ID
  name          : string  // The song name
  artistid      : number  // The primary artist ID
  filesize      : number  // The file size of the song in bytes
  duration      : number  // The song's duration in seconds
  tags          : string  // The song's tags, separated by dots. The string also has extra dots at the start and end for unknown reasons
  musicplatform : number  // The platform this song comes from. 0 for None, 1 for NCS.
  extraartists  : string  // The IDs of the artists that contributed to the song, separated with .
  externallink  : string  // The external link to the song (NOT the GD download link)
  newbutton     : boolean // Whether there's a yellow NEW icon next to the song
  priorityorder : number  // The priority order of the song. Usually, songs are ordered alphabetically, but if the song has this number set above 0, then it gets put above all the other songs. The song also receives a blue NEW icon. All of the songs with this property have the previous property set as 0.
  songnumber    : number  // The number of the song in the list. Starts at 1. Usage is unknown
}
export const AudioMusicLib_Map = {
    0: 'id',
    1: 'name',
    2: 'artistid',
    3: 'filesize',
    4: 'duration',
    5: 'tags',
    6: 'musicplatform',
    7: 'extraartists',
    8: 'externallink',
    9: 'newbutton',
   10: 'priorityorder',
   11: 'songnumber',
}
