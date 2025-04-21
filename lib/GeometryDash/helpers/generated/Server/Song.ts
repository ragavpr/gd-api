export type Song = {
  id               : number       // The ID of the song on Newgrounds
  name             : string       // The name of the song
  artistId         : number       // Newgrounds ArtistID
  artistName       : string       // The name of the artist who made the song
  size             : number       // Size of the song in MB, rounded to two decimal places
  videoId          : string       // the Video ID for the songs YouTube Video
  youtubeUrl       : string       // The URL of the newgrounds user's youtube channel
  isVerified       : boolean      // if the song artist is scouted on newgrounds
  songPriority     : number       // priority over the song list
  link             : string       // Link to the song's mp3
  noNgEnum         : number       // Type of NONG. 0 for none, 1 for NCS.
  extraArtistIds   : number[] // IDs of extra artists, separated by .
  new              : boolean      // Whether the NEW icon shows up or not
  newType          : number       // Type of NEW icon. 0 for Yellow, 1 for Blue
  extraArtistNames : [number, string][] // Artist names in this format: {id},{name},{id},{name}
}
export const Song_Map = {
    1: "id",
    2: "name",
    3: "artistId",
    4: "artistName",
    5: "size",
    6: "videoId",
    7: "youtubeUrl",
    8: "isVerified",
    9: "songPriority",
   10: "link",
   11: "noNgEnum",
   12: "extraArtistIds",
   13: "new",
   14: "newType",
   15: "extraArtistNames",
}
