export { type Song, SongM, SongSM } from "./helpers/generated/Server/Song.ts";
export { type User, UserM, UserSM } from "./helpers/generated/Server/User.ts"
export { type Level, LevelM, LevelSM } from "./helpers/generated/Server/Level.ts"
export { type GauntletInfo, GauntletInfoM, GauntletInfoSM } from "./helpers/generated/Server/GauntletInfo.ts"
export { type GetGJChallenges, GetGJChallengesM, GetGJChallengesSM } from "./helpers/generated/Server/CGetGJChallenges.ts"
export { type GetGJRewards, GetGJRewardsM, GetGJRewardsSM } from "./helpers/generated/Server/CGetGJRewards.ts"
export { type Quest, QuestM, QuestSM } from "./helpers/generated/Server/CGetGJChallenges.ts"

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
