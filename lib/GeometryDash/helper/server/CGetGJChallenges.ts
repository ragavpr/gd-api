import * as TR from "../Serializers"
import { GauntletInfoM, GauntletInfoSM } from "./GauntletInfo"

export type Quest = {
    cycle: number // Maybe the amount of quests completed?
    questType: number // The type of item needed: 1 is orbs, 2 is coins, and 3 is stars
    amount: number // The amount of the item needed
    rewardDiamonds: number // How many diamonds the quest gives
    name: string // Quest name
}

export const QuestSM: TR.SerializeMap = {
    "default": TR.Number,
    4: TR.NoSerializer,
}

export const QuestM: TR.KeyMap = {
    0: "cycle",
    1: "questType",
    2: "amount",
    3: "rewardDiamonds",
    4: "name",
}

export const QuestS = TR.DelimArr<Quest>(QuestM, QuestSM, ",")

export type GetGJChallenges = {
    randStr2: string // A random string of 5 characters
    playerID: number // User's player ID
    nonce: number // The number used for the chk
    udid: string
    accountID: number // User's account ID
    timeLeft: number // Seconds left until quests are replenished
    quests1: Quest
    quests2: Quest
    quests3: Quest
}

export const GetGJChallengesSM: TR.SerializeMap = {
    "default": TR.Number,
    0: TR.NoSerializer,
    3: TR.NoSerializer,
    6: QuestS,
    7: QuestS,
    8: QuestS,
}

export const GetGJChallengesM: TR.KeyMap = {
    0: "randStr2",
    1: "playerID",
    2: "nonce",
    3: "udid",
    4: "accountID",
    5: "timeLeft",
    6: "quest1",
    7: "quest2",
    8: "quest3",
}

export const getGJChallengesS = TR.DelimArr<GetGJChallenges>(GauntletInfoM, GauntletInfoSM, ":")
