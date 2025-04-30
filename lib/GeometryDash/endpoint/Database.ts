import { GJEndpoint } from "./GJEndpoint";
import * as TR from "../helper/Serializers";
import * as T from "../helper/types";
import { secret, key, salt } from "../hidden";
import { B64urlDec, generateRS, saltedSHA1, splitPos, B64urlEnc, XOR, SHA1, B64Dec, B64Enc } from "../utils";

import * as crypto from 'crypto'

import { GD_API_ENDPOINT, GD_VERIFY_RESPONSES } from "../env";

const endpoint = `${GD_API_ENDPOINT}/database`;

// USERS

export class GetGJScores20 extends GJEndpoint {
  static #serializer = TR.DelimObj<T.User>(T.UserM, T.UserSM, ":");
  static decode(str: string): T.User[] {
    // OutOfSpec: Removed empty objects in output
    return str.split("|").filter(s => s.length != 0).map(item => this.#serializer.decode(item))
  }
  //OutOfSpec: Trailing "|" is ignored
  static encode(obj: T.User[]): string {
    return obj.map(item => this.#serializer.encode(item)).join("|")
  }
  static async call(state: T.State, type: 'top' | 'friends' | 'relative' | 'creators' , count?: number) {
    count ??= type == 'friends' ? 50 : 100
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJScores20.php`,
      {
        type,
        count,
        secret: secret.anonymous,
      }
    );

    return this.decode(response.body);
  }
}

export class GetGJUserInfo20 extends GJEndpoint {
  static #serializer = TR.DelimObj<T.User>(T.UserM, T.UserSM, ":");
  static decode = (str: string) => this.#serializer.decode(str);
  static encode = (obj: T.User) => this.#serializer.encode(obj);
  static async call(state: T.State, accountID: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJUserInfo20.php`,
      {
        targetAccountID: accountID,
        secret: secret.anonymous,
      }
    );
    
    return this.decode(response.body);
  }
}

// export class GetGJUsers20 extends GJEndpoint {
//   // TODO: search
// }

// export class UpdateGJUserScore22 extends GJEndpoint {
//   // TODO: SaveData
//   static async call(state: T.State, accountID: number) {
//     const response = await this.callEndpoint(
//       state,
//       `${endpoint}/getGJUserInfo20.php`,
//       {
//         targetAccountID: accountID,
//         secret: secret.anonymous,
//       }
//     );

//     return response.body;
//   }
// }0

// LEVELS

export class DeleteGJLevelUser20 extends GJEndpoint {
  static async call(state: T.State, levelID: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/deleteGJLevelUser20.php`,
      {
        levelID,
        secret: secret.user,
      },
    );
    if(response.body != "1") throw new Error("Failed to delete level");
    return
  }
}

export class DownloadGJLevel22 extends GJEndpoint {
  static #serializer = TR.DelimObj<T.Level>(T.LevelM, T.LevelSM, ":");
  static encode(obj: T.Level): string {
    return [
      this.#serializer.encode(obj),
      this.hash1(obj.levelString!),
      this.hash2(obj),
    ].join("#");
  }

  static decode(str: string): T.Level {
    const [dec_str, hash1, hash2] = str.split("#");
    
    const result = this.#serializer.decode(dec_str!);

    if (GD_VERIFY_RESPONSES) {
      const dig_hash1 = this.hash1(result.levelString!);
      if (dig_hash1 != hash1) {
        console.warn(`Hash mismatch\n   Actual:`, dig_hash1, `\n Expected:`, hash1);
        throw new Error("Hash mismatch");
      }
      const dig_hash2 = this.hash2(result);
      if (dig_hash2 != hash2) {
        console.warn(`Hash mismatch\n   Actual:`, dig_hash2, `\n Expected:`, hash2);
        throw new Error("Hash mismatch");
      }
    }

    return result;
  }
  static hash1(levelString: string): string {
    if (levelString.length < 41) return SHA1(levelString + salt.levelHash);
    let m = Math.floor(levelString.length / 40);
    const code = Array.from({ length: 40 }, (_, i) => {
      return levelString[i*m]
    }).join("");
    return SHA1(code + salt.levelHash);
  }
  static hash2(obj: T.Level) {
    const code = [
      obj.playerID!,
      obj.stars || 0,
      obj.demon ? 1 : 0,
      obj.levelID!,
      obj.verifiedCoins ? 1 : 0,
      obj.featureScore || 0,
      obj.password!,
      obj.dailyNumber || 0
    ].join(",")
    return SHA1(code + salt.levelHash)
  }

  static async call(state: T.State, levelID: number) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const rs = generateRS(10)
    const chk = rand_char + B64urlEnc(XOR(rand_int.toString(), key.challenge))
    const response = await this.callEndpoint(
      state,
      `${endpoint}/downloadGJLevel22.php`,
      {
        levelID,
        inc: 1,
        secret: secret.anonymous,
        rs,
        chk,
      }
    );
    
    return this.decode(response.body);
  }
}

export class GetGJDailyLevel extends GJEndpoint {
  // static #helper = TR.DelimArr(T.GetGJChallengesM, T. , ":")

  static decode(ori: string) {
    const [index, timeLeft, rewards_str, hash] = ori.split("|");

    let rewards = undefined
    if (rewards_str) {
      const [rand_str, enc_str] = splitPos(rewards_str, 5) 

      if (GD_VERIFY_RESPONSES && hash) {
        const digest = saltedSHA1(enc_str!, salt.rewardsHash);
        if (digest != hash) {
          console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
          throw new Error("Hash mismatch");
        }
      }
      console.log(enc_str)
      const dec_str = XOR(B64Dec(enc_str!), key.chestRewards);
      rewards = dec_str //TODO: this.#helper.decode(dec_str)
    }
    return {
      index: parseInt(index!),
      timeLeft: parseInt(timeLeft!),
      rewards
    }
  }

  //TODO: Verify Random
  static encode(obj: {index: number, timeLeft: number, rewards: string | undefined}) {
    const list: (number | string)[] = [
      obj.index,
      obj.timeLeft,
    ]
    if(obj.rewards) {
      const dec_str = B64Enc(XOR(obj.rewards, key.chestRewards))
      list.push(generateRS(5) + dec_str)
      list.push(SHA1(dec_str + salt.rewardsHash))
    }
    return list.join("|")
  }

  static async call(state: T.State, type: 0 | 1 | 2 = 0) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const chk = rand_char + B64urlEnc(XOR(rand_int.toString(), key.chestRewards))
    // console.log(`Nonce: [${rand_int}, ${rand_char}, ${chk}]`)
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJDailyLevel.php`,
      {
        secret: secret.anonymous,
        type,
        chk
      },
    );
    
    const result = this.decode(response.body);
    return result
  }
}

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
      }
    );
    return this.decode(response.body);
  }
}

// export class GetGJLevels21 extends GJEndpoint {
//   // TODO: Search
// }

// export class GetGJLevelScores211 extends GJEndpoint {
//   // TODO: Also submits stats, recapture
//   static async call(state: T.State, levelID: number, type: 0 | 1 | 2 = 0) {
//     const response = await this.callEndpoint(
//       state,
//       `${endpoint}/getGJGauntlets21.php`,
//       {
//         levelID,
//         // percent: 0,
//         time: 0,
//         points: 0,
//         plat,
//         secret: secret.anonymous,
//         type,
//         mode,
//         s1: 0 + 8354,
//         s2: 0 + 3991,
//         s3: 0 + 4085,
//         s4: 1482 + (0 + 1) + (0 + 3991) + (0 + 8354) + (0 + 4085)**2 - 50028039,
//         s5: crypto.randomInt(2_000),
//         s6: "", 
//         s7: generateRS(10),
//         s8: 0,
//         s9: 0 + 5819,
//         s10: 0,
//         chk: 
//       }
//     );
//     return this.decode(response.body);
//   }
// }

// export class GetGJLevelScoresPlat extends GJEndpoint {
//   //same as above
// }

export class GetGJMapPacks21 extends GJEndpoint {
  static #serializer = TR.DelimObj<T.MapPack>(T.MapPackM, T.MapPackSM, ":")

  static hash(mapPacks: T.MapPack[]) {
    const code = mapPacks.map(pack => {
      return `${pack.packID.toFixed()[0]}${pack.packID%10}${pack.stars}${pack.coins}`
    }).join("")
    return SHA1(code + salt.levelHash)
  }

  static decode(str: string) {
    const [dec_str, page_str, hash] = str.split("#");

    const mapPacks = dec_str!.split("|").map(item => this.#serializer.decode(item))

    if (GD_VERIFY_RESPONSES) {
      const digest = this.hash(mapPacks)
      if (digest !== hash) {
        console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
        throw new Error("Hash mismatch");
      }
    }

    return {
      mapPacks,
      page: TR.PageS.decode(page_str!),
    }
  }

  static encode(obj: ReturnType<typeof this.decode>) {
    return [
      obj.mapPacks.map(pack => this.#serializer.encode(pack)).join("|"),
      TR.PageS.encode(obj.page),
      this.hash(obj.mapPacks)
    ].join("#")
  };

  static async call(state: T.State, page: number = 0) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJMapPacks21.php`,
      {
        secret: secret.anonymous,
        special: 1,
      }
    );
    return this.decode(response.body);
  }
}

// export class RateGJDemon21 extends GJEndpoint {
//   static async call(state: T.State, levelID: number, rating: number) {
//     const response = await this.callEndpoint(
//       state,
//       `${endpoint}/rateGJDemon21.php`,
//       {
//         secret: secret.mod,
//         levelID,
//         rating,
//       },
//     )
//     if(response.body != "1") {
//       throw new Error("Failed to rate demon");
//     }
//     return
//   }
// }

// export class RateGJStars211 extends GJEndpoint {
//   // Recapture with randomGen
// }

// export class ReportGJLevel extends GJEndpoint {
//   // Backlog: LowPriority
// }

// export class SuggestGJStars20 extends GJEndpoint {
//   // Recapture with randomGen // notCaptured
// }

// export class UpdateGJDesc20 extends GJEndpoint {
//   // Backlog: LowPriority // notCaptured
// }

// export class UploadGJLevel21 extends GJEndpoint {
//   // Backlog: LowPriority
// }

export class GetGJLevelLists extends GJEndpoint {
  static #serializer = TR.DelimObj<T.LevelList>(T.LevelListM, T.LevelListSM, ":");

  // static hash(levelList: T.LevelList[]) {
  //   const code = levelList.map(pack => {
  //     return `${pack.packID.toFixed()[0]}${pack.packID%10}${pack.stars}${pack.coins}`
  //   }).join("")
  //   return SHA1(code + salt.levelHash)
  // }

  static decode(str: string) {
    const [dec_str, authors, page_str, hash] = str.split("#");

    // console.log(str.split("#"))

    const levelList = dec_str!.split("|").map(item => this.#serializer.decode(item))

    // if (GD_VERIFY_RESPONSES) {
    //   const digest = this.hash(levelList)
    //   if (digest !== hash) {
    //     console.warn(`Hash mismatch\n   Actual:`, digest, `\n Expected:`, hash);
    //     throw new Error("Hash mismatch");
    //   }
    // }

    return {
      levelList,
      page: TR.PageS.decode(page_str!),
    }
  }

  // static encode(obj: ReturnType<typeof this.decode>) {
  //   return [
  //     obj.levelList.map(pack => this.#serializer.encode(pack)).join("|"),
  //     TR.PageS.encode(obj.page),
  //     this.hash(obj.levelList)
  //   ].join("#")
  // };

  static async call(state: T.State, str: string, type: number, page: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJLevelLists.php`,
      {
        str,
        type,
        page,
        secret: secret.anonymous,
        diff: "-"
      },
    );
    return this.decode(response.body);
  }
}

//AUDIO

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
    );
    return this.decode(response.body);
  }
}

export class GetGJTopArtists extends GJEndpoint {
  static #serializer = TR.DelimObj<T.Song>(T.SongM, T.SongSM, ":");
  static decode(str: string) {
    const [data, page] = str.split("#");
    const list = data!.split("|");

    return {
      page: TR.PageS.decode(page!),
      artists: list.map((i) => this.#serializer.decode(i))
    }
  }
  static encode(obj: any) {
    return `${obj.artists.map((i: any) => this.#serializer.encode(i)).join("|")}#${TR.PageS.encode(obj.page)}`
  };

  static async call(state: T.State, page: number, total: number) {
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJTopArtists.php`,
      {
        secret: secret.anonymous,
        page, total
      },
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

    const dec_str = XOR(B64urlDec(enc_str), key.challenge);
    const dec_obj = this.#helper.decode(dec_str)
    return dec_obj
  }

  //Verify random
  static encode(obj: any) {
    const dec_str = this.#helper.encode(obj)
    const enc_str = B64urlEnc(XOR(dec_str, key.challenge))
    const hash = saltedSHA1(enc_str, salt.questsHash)
    return `${generateRS(5)}${enc_str}|${hash}`
  }

  static async call(state: T.State, world: 0 | 1 = 0) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const chk = rand_char + B64urlEnc(XOR(rand_int.toString(), key.challenge))
    console.log(`Nonce: [${rand_int}, ${rand_char}, ${chk}]`)
    const response = await this.callEndpoint(
      state,
      `${endpoint}/getGJChallenges.php`,
      {
        world,
        secret: secret.anonymous,
        chk
      },
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

    const dec_str = XOR(B64urlDec(enc_str), key.chestRewards);
    const dec_obj = this.#helper.decode(dec_str)
    return dec_obj
  }

  // Verify random
  static encode(obj: any) {
    const dec_str = this.#helper.encode(obj)
    const enc_str = B64urlEnc(XOR(dec_str, key.chestRewards))
    const hash = saltedSHA1(enc_str, salt.rewardsHash)
    return `${generateRS(5)}${enc_str}|${hash}`
  }

  static async call(state: T.State, rewardType: 0 | 1 | 2 = 0) {
    const rand_int = crypto.randomInt(1_000_000);
    const rand_char = generateRS(5)
    const chk = rand_char + B64urlEnc(XOR(rand_int.toString(), key.chestRewards))
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
    );
    const result = this.decode(response.body);
    return result
  }
}
