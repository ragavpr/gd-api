export { type Song, SongM, SongSM } from "./server/Song.ts";
export { type User, UserM, UserSM } from "./server/User.ts"
export { type Level, LevelM, LevelSM } from "./server/Level.ts"
export { type LevelList, LevelListM, LevelListSM } from "./server/LevelList.ts"
export { type MapPack, MapPackM, MapPackSM } from "./server/MapPack.ts"
export { type GauntletInfo, GauntletInfoM, GauntletInfoSM } from "./server/GauntletInfo.ts"
export { type GetGJChallenges, GetGJChallengesM, GetGJChallengesSM } from "./server/CGetGJChallenges.ts"
export { type GetGJRewards, GetGJRewardsM, GetGJRewardsSM } from "./server/CGetGJRewards.ts"
export { type Quest, QuestM, QuestSM } from "./server/CGetGJChallenges.ts"

export type M<T> = {
  rawBody: Uint8Array;
} & T;

export type State = {
  device: {
    udid: string
  },
  user?: {
    userName: string,
    password?: string,
    gjp2: string,
    accountID: number,
    playerID: number,
    sID?: number
  }
}
