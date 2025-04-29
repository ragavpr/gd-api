import * as TR from "./helpers/Serializers";
import * as T from "./types";
import * as CG from "../utils";
import * as C from "./utils";
import * as H from "./hidden";

import * as DB from './endpoint/Database'
import * as AC from './endpoint/Accounts'

import { type IStore } from "../State";

export class GeometryDash {
  store;
  state;
  constructor(store: IStore<T.State>) {
    this.store = store;
    this.state = store.load();

    if (!this.state.device) {
      this.state.device = {
        udid: C.generateUUID(),
      };
    }
  }

  isLoggedIn() {
    return this.state.user?.userName ? true : false;
  }

  logout() {
    this.state.user = undefined;
    this.store.save(this.state);
  }
  loginGJAccount = async (userName: string, password: string, sID?: number) => {
    if (this.isLoggedIn()) {
      console.warn("Already logged in");
      return this.state.user;
    }
    this.state.user = await AC.LoginGJAccount.call(this.state, userName, password, sID);
    this.store.save(this.state);
    return this.state.user;
  }

  downloadGJLevel = (levelID: number) => DB.DownloadGJLevel22.call(this.state, levelID)
  getGJGauntlets = () => DB.GetGJGauntlets21.call(this.state);

  getGJSongInfo = (songID: number) => DB.GetGJSongInfo.call(this.state, songID)
  getGJTopArtists = (page: number = 0, total: number = 0) => DB.GetGJTopArtists.call(this.state, page, total)
  
  getGJChallenges = (world: 0 | 1 = 0) => DB.GetGJChallenges.call(this.state, world)
  getGJRewards = (rewardType: 0 | 1 | 2 = 0) => DB.GetGJRewards.call(this.state, rewardType)
}
