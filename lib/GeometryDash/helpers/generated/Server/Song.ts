export type Song = {
  id               : number       // The ID of the song on Newgrounds
  name             : string       // The name of the song
  artistid         : number       // Newgrounds ArtistID
  artistname       : string       // The name of the artist who made the song
  size             : number       // Size of the song in MB, rounded to two decimal places
  videoid          : string       // the Video ID for the songs YouTube Video
  youtubeurl       : string       // The URL of the newgrounds user's youtube channel
  isverified       : boolean      // if the song artist is scouted on newgrounds
  songpriority     : number       // priority over the song list
  link             : string       // Link to the song's mp3
  nongenum         : number       // Type of NONG. 0 for none, 1 for NCS.
  extraartistids   : unidentified // IDs of extra artists, separated by .
  new              : boolean      // Whether the NEW icon shows up or not
  newtype          : number       // Type of NEW icon. 0 for Yellow, 1 for Blue
  extraartistnames : unidentified // Artist names in this format: {id},{name},{id},{name}
}
export const Song_Map = {
    1: "id",
    2: "name",
    3: "artistid",
    4: "artistname",
    5: "size",
    6: "videoid",
    7: "youtubeurl",
    8: "isverified",
    9: "songpriority",
   10: "link",
   11: "nongenum",
   12: "extraartistids",
   13: "new",
   14: "newtype",
   15: "extraartistnames",
}
