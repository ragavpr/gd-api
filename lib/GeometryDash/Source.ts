import * as T from './helper/types';
import { generateUUID } from './utils';

import * as DB from './endpoint/Database';
import * as AC from './endpoint/Accounts';

import { type IStore } from '../State';

export class GeometryDash {
  store;
  state;
  constructor(store: IStore<T.State>) {
    this.store = store;
    this.state = store.load();

    if (!this.state.device) {
      this.state.device = {
        udid: generateUUID(),
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
      console.warn('Already logged in');
      return this.state.user;
    }
    this.state.user = await AC.LoginGJAccount.call(
      this.state,
      userName,
      password,
      sID
    );
    this.store.save(this.state);
    return this.state.user;
  };

  getGJScores = (
    type: 'top' | 'friends' | 'relative' | 'creators',
    count?: number
  ) => DB.GetGJScores20.call(this.state, type, count);
  getGJUserInfo = (targetAccountID: number) =>
    DB.GetGJUserInfo20.call(this.state, targetAccountID);
  // getGJUsers = (targetAccountID: number) => DB.GetGJUsers20.call(this.state, targetAccountID)
  // updateGJUserScore = (stars: number, diamonds: number, demons: number, icon: number, color1: number, color2: number, iconType: number, glow: number, secret: string) => DB.UpdateGJUserScore20.call(this.state, stars, diamonds, demons, icon, color1, color2, iconType, glow, secret)

  deleteGJLevelUser = (levelID: number) =>
    DB.DeleteGJLevelUser20.call(this.state, levelID);
  downloadGJLevel = (levelID: number) =>
    DB.DownloadGJLevel22.call(this.state, levelID);
  getGJDailyLevel = (type: 0 | 1 | 2 = 0) =>
    DB.GetGJDailyLevel.call(this.state, type);
  getGJGauntlets = () => DB.GetGJGauntlets21.call(this.state);
  //
  //
  getGJMapPacks = (page?: number) => DB.GetGJMapPacks21.call(this.state, page);
  // rateGJDemon = (levelID: number, rating: number) => DB.RateGJDemon21.call(this.state, levelID, rating)

  //
  getGJLevelLists = (str: string, type: number, page: number) =>
    DB.GetGJLevelLists.call(this.state, str, type, page);
  //

  getGJSongInfo = (songID: number) => DB.GetGJSongInfo.call(this.state, songID);
  getGJTopArtists = (page: number = 0, total: number = 0) =>
    DB.GetGJTopArtists.call(this.state, page, total);

  getGJChallenges = (world: 0 | 1 = 0) =>
    DB.GetGJChallenges.call(this.state, world);
  getGJRewards = (rewardType: 0 | 1 | 2 = 0) =>
    DB.GetGJRewards.call(this.state, rewardType);
}
