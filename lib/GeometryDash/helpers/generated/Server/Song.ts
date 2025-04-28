import * as TR from "../../Serializers"

export type Song = {
  songID           : number             // The ID of the song on Newgrounds
  name             : string             // The name of the song
  artistID         : number             // Newgrounds ArtistID
  artistName       : string             // The name of the artist who made the song
  size             : number             // Size of the song in MB, rounded to two decimal places
  videoID          : string             // the Video ID for the songs YouTube Video
  youtubeUrl       : string             // The URL of the newgrounds user's youtube channel
  isVerified       : boolean            // if the song artist is scouted on newgrounds
  songPriority     : number             // priority over the song list
  link             : string             // Link to the song's mp3
  noNgEnum         : number             // Type of NONG. 0 for none, 1 for NCS.
  extraArtistIDs   : number[]           // IDs of extra artists, separated by .
  new              : boolean            // Whether the NEW icon shows up or not
  newType          : number             // Type of NEW icon. 0 for Yellow, 1 for Blue
  extraArtistNames : [number, string][] // Artist names in this format: {id},{name},{id},{name}
} & Record<string, any>

const extraArtistNames: TR.Serializer<[number, string][]> = {
  decode(input: string) {
    const inArr = input.split(',')

    if(inArr.length % 2 != 0) throw new Error('Expected even number of elements')

    const outArr: [number, string][] = []
    for(let i = 0; i < inArr.length; i += 2) {
      outArr.push([
        parseInt(inArr[i]!),
        inArr[i+1]!
      ])
    }
    return outArr
  },
  encode(input: [number, string][]) {
    return input.map(([id, name]) => `${id},${name}`).join(',')
  }
}

export const SongSM: TR.SerializeMap = {
  "default": TR.NoSerializer,
  1: TR.Number,
  3: TR.Number,
  5: TR.Number,
  8: TR.BooleanNum,
  9: TR.Number,
  10: TR.UrlEncoded,
  11: TR.Number,
  // 13: TR.BooleanNum,
  14: TR.Number,
  // 12: TR.NumberArray,
  15: extraArtistNames
}

export const SongM: TR.KeyMap = {
    1: "songID",
    2: "name",
    3: "artistID",
    4: "artistName",
    5: "size",
    6: "videoID",
    7: "youtubeUrl",
    8: "isVerified",
    9: "songPriority",
   10: "link",
   11: "noNgEnum",
   12: "extraArtistIDs",
   13: "new",
   14: "newType",
   15: "extraArtistNames",
}
