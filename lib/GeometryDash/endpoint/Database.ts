import { GJEndpoint } from "./GJEndpoint";
import * as TR from "../helpers/Serializers";
import * as T from "../types";
import { secret, key, salt } from "../hidden";
import { B64Dec, generateRS, saltedSHA1, splitPos, B64Enc, XOR } from "../utils";

import * as crypto from 'crypto'

import { GD_API_ENDPOINT, GD_VERIFY_RESPONSES } from "../env";

const endpoint = `${GD_API_ENDPOINT}/database`;

export class GetGJGauntlets21 extends GJEndpoint {  
  static #serializer = TR.DelimObj<T.GauntletInfo>(
    T.GauntletInfoM,
    T.GauntletInfoSM,
    ":"
  );

  static hash(obj: T.GauntletInfo[]) {
    const hash_str = obj
      .map((i) => i.gauntletID + i.levelIDs.join(","))
      .join("");
    return saltedSHA1(hash_str, salt.levelHash);
  }

  static decode(ori: string): T.GauntletInfo[] {
    const [str, hash] = ori.split("#");
    const result = str!.split("|").map((i) => this.#serializer.decode(i));
    if (GD_VERIFY_RESPONSES) {
      const digest = this.hash(result);
      if (digest != hash) {
        console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
        throw new Error("Hash mismatch");
      }
    }
    return result;
  }

  static encode(obj: T.GauntletInfo[]) {
    return (
      obj.map((i) => this.#serializer.encode(i)).join("|") + "#" + this.hash(obj)
    );
  }

  static async call(state: T.State) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJGauntlets21.php`,
      {
        secret: secret.anonymous,
        special: 1,
      },
      0b111
    );
    return this.decode(response.body);
  }
}

export class GetGJSongInfo extends GJEndpoint {
  static #serializer = TR.DelimObj<T.Song>(T.SongM, T.SongSM, "~|~");
  static decode = this.#serializer.decode;
  static encode = this.#serializer.encode;

  static async call(state: T.State, songID: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJSongInfo.php`,
      {
        secret: secret.anonymous,
        songID,
      },
      0b111
    );
    return this.decode(response.body);
  }
}

export class GetGJTopArtists extends GJEndpoint {
  static #serializer = TR.DelimObj<T.Song>(T.SongM, T.SongSM, ":");
  static #pageS = TR.DelimArr({
    0: "total",
    1: "start",
    2: "count",
  }, { "default": TR.Number }, ":")
  static decode(str: string) {
    const [data, page] = str.split("#");
    const list = data!.split("|");

    return {
      page: this.#pageS.decode(page!),
      artists: list.map((i) => this.#serializer.decode(i))
    }
  }
  static encode(obj: any) {
    return `${obj.artists.map((i: any) => this.#serializer.encode(i)).join("|")}#${this.#pageS.encode(obj.page)}`
  };

  static async call(state: T.State, page: number, total: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJTopArtists.php`,
      {
        secret: secret.anonymous,
        page, total
      },
      0b111
    );
    return this.decode(response.body);
  }
}

export class GetGJChallenges extends GJEndpoint {
  static #helper = TR.DelimArr<T.GetGJChallenges>(T.GetGJChallengesM, T.GetGJChallengesSM, ":")

  static decode(ori: string): any {
    const [b64_str, hash] = ori.split("|");
    if(!b64_str || !hash)
      throw new Error("Unexpected response")

    const [rand, enc_str] = splitPos(b64_str, 5)
    if(!rand || !enc_str)
      throw new Error("Unexpected response")

    if (GD_VERIFY_RESPONSES) {
      const digest = saltedSHA1(enc_str, salt.questsHash);
      if (digest != hash) {
        console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
        throw new Error("Hash mismatch");
      }
    }

    const dec_str = XOR(B64Dec(enc_str), key.challenge);
    const dec_obj = this.#helper.decode(dec_str)
    return dec_obj
  }

  static encode(obj: any) {
    const dec_str = this.#helper.encode(obj)
    const enc_str = B64Enc(XOR(dec_str, key.challenge))
    const hash = saltedSHA1(enc_str, salt.questsHash)
    return `${generateRS(5)}${enc_str}|${hash}`
  }

  static async call(state: T.State, world: 0 | 1 = 0) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const chk = rand_char + B64Enc(XOR(rand_int.toString(), key.challenge))
    console.log(`Nonce: [${rand_int}, ${rand_char}, ${chk}]`)
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJChallenges.php`,
      {
        world,
        secret: secret.anonymous,
        chk
      },
      0b111
    );
    const result = this.decode(response.body);
    return result
  }
}

export class GetGJRewards extends GJEndpoint {
  static #helper = TR.DelimArr<T.GetGJRewards>(T.GetGJRewardsM, T.GetGJRewardsSM, ":")

  static decode(ori: string): any {
    const [b64_str, hash] = ori.split("|");
    if(!b64_str || !hash)
      throw new Error("Unexpected response")

    const [rand, enc_str] = splitPos(b64_str, 5)
    if(!rand || !enc_str)
      throw new Error("Unexpected response")

    if (GD_VERIFY_RESPONSES) {
      const digest = saltedSHA1(enc_str, salt.rewardsHash);
      if (digest != hash) {
        console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
        throw new Error("Hash mismatch");
      }
    }

    const dec_str = XOR(B64Dec(enc_str), key.chestRewards);
    const dec_obj = this.#helper.decode(dec_str)
    return dec_obj
  }

  static encode(obj: any) {
    const dec_str = this.#helper.encode(obj)
    const enc_str = B64Enc(XOR(dec_str, key.chestRewards))
    const hash = saltedSHA1(enc_str, salt.rewardsHash)
    return `${generateRS(5)}${enc_str}|${hash}`
  }

  static async call(state: T.State, rewardType: 0 | 1 | 2 = 0) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const chk = rand_char + B64Enc(XOR(rand_int.toString(), key.chestRewards))
    console.log(`Nonce: [${rand_int}, ${rand_char}, ${chk}]`)
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJRewards.php`,
      {
        rewardType,
        secret: secret.anonymous,
        chk,
        r1: Math.max(rewardType - 1, 0),
        r2: 0
      },
      0b111
    );
    const result = this.decode(response.body);
    return result
  }
}
