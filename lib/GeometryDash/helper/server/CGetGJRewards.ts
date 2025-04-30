import * as TR from "../Serializers"

export type Reward = {
    orbs: number,
    diamonds: number,
    item1Type: number,
    item2Type: number,
}

export const RewardSM: TR.SerializeMap = {
    "default": TR.Number,
}

export const RewardM: TR.KeyMap = {
    0: "orbs",
    1: "diamonds",
    2: "item1Type",
    3: "item2Type",
}

export const RewardS = TR.DelimArr<Reward>(RewardM, RewardSM, ",")

export type GetGJRewards = {
    randStr2: string // A random string of 5 characters
    playerID: number // User's player ID
    nonce: number // The number used for the chk
    udid: string // UserDeviceID
    accountID: number // User's account ID
    sChestRenewsIn: number
    sChestReward: Reward
    sChestCount: number
    lChestRenewsIn: number
    lChestReward: Reward
    lChestCount: number
    rewardType: number
}

export const GetGJRewardsSM: TR.SerializeMap = {
    "default": TR.Number,
    0: TR.NoSerializer,
    3: TR.NoSerializer,
    6: RewardS,
    9: RewardS,
}

export const GetGJRewardsM: TR.KeyMap = {
    0: "randStr2",
    1: "playerID",
    2: "nonce",
    3: "udid",
    4: "accountID",
    5: "sChestRenewsIn",
    6: "sChestReward",
    7: "sChestCount",
    8: "lChestRenewsIn",
    9: "lChestReward",
    10: "lChestCount",
    11: "rewardType",
}
