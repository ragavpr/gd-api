import * as TR from '../Serializers';

const NumberArrayDot: TR.Serializer<number[]> = {
  decode(str) {
    return str
      .split('.')
      .filter((x) => x.length > 0)
      .map((x) => parseInt(x));
  },
  encode(obj) {
    throw new Error('Not implemented');
    return obj.join('.');
  },
};

export type Music = {
  songID       : number;   // The song ID
  name         : string;   // The song name
  artistID     : number;   // The primary artist ID
  fileSize     : number;   // The file size of the song in bytes
  duration     : number;   // The song's duration in seconds
  tags         : string;   // The song's tags, separated by dots. The string also has extra dots at the start and end for unknown reasons
  musicPlatform: number;   // The platform this song comes from. 0 for None, 1 for NCS.
  extraArtists : string;   // The IDs of the artists that contributed to the song, separated with .
  externalLink : string;   // The external link to the song (NOT the GD download link)
  newButton    : boolean;  // Whether there's a yellow NEW icon next to the song
  priorityOrder: number;   // The priority order of the song. Usually, songs are ordered alphabetically, but if the song has this number set above 0, then it gets put above all the other songs. The song also receives a blue NEW icon. All of the songs with this property have the previous property set as 0.
  songNumber   : number;   // The number of the song in the list. Starts at 1. Usage is unknown
};
export const MusicSM = {
  0 : TR.Number,
  2 : TR.Number,
  3 : TR.Number,
  4 : TR.Number,
  5 : NumberArrayDot,
  6 : TR.Number,
  7 : NumberArrayDot,
  8 : TR.UrlEncoded,
  9 : TR.BooleanNum,
  10: TR.Number,
  11: TR.Number,
};
export const MusicM = {
  0 : 'songID',
  1 : 'name',
  2 : 'artistID',
  3 : 'fileSize',
  4 : 'duration',
  5 : 'tags',
  6 : 'musicPlatform',
  7 : 'extraArtists',
  8 : 'externalLink',
  9 : 'newButton',
  10: 'priorityOrder',
  11: 'songNumber',
};

export type Artist = {
  artistID      : number;
  name          : string;
  website       : string;
  youtubeChannel: string;
};
export const ArtistSM = {
  0: TR.Number,
  2: TR.UrlEncoded,
};
export const ArtistM = {
  0: 'artistID',
  1: 'name',
  2: 'website',
  3: 'youtubeChannel',
};

export type Tag = {
  tagID: number;
  name : string;
};
export const TagSM = {
  0: TR.Number,
};
export const TagM = {
  0: 'tagID',
  1: 'name',
};
