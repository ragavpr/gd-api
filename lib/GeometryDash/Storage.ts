import fs from 'fs';
import zlib from 'zlib';

import * as TR from './helper/Serializers';
import { GD_DATA_PATH } from './env';
import {
  ItemSfxSM,
  ItemSfxM,
  CreditSfxM,
  CreditSfxSM,
  type ItemSfx,
  type CreditSfx,
} from './helper/client/AudioSfxLib';
import {
  MusicSM,
  MusicM,
  type Music,
  ArtistSM,
  ArtistM,
  type Artist,
  TagSM,
  TagM,
  type Tag,
} from './helper/client/AudioMusicLib';

export class Storage {
  static populateSfx() {
    const sfxlib_dat = fs.readFileSync(`${GD_DATA_PATH}/sfxlibrary.dat`);
    const sfxlib = zlib
      .inflateSync(Buffer.from(sfxlib_dat.toString('utf8'), 'base64url'))
      .toString('utf8');

    const [sfxList_str, credits_str] = sfxlib.split('|');

    const NodeSfxLibS = TR.DelimArr<ItemSfx>(ItemSfxM, ItemSfxSM, '\x0B');
    const SfxCreditS = TR.DelimArr<CreditSfx>(CreditSfxM, CreditSfxSM, ',');

    const regex = /^(.*?),(.*),(.*?),(.*?),(.*?),(.*?)$/;

    const sfxList = sfxList_str!
      .split(';')
      .filter((x) => x.length > 0)
      .map((str) => {
        // Replacing delimiter from ',' to '~|~' as names have ','
        return str.match(regex)!.slice(1, 7).join('\x0B')!;
      })
      .map((node) => {
        return NodeSfxLibS.decode(node);
      });

    const credits = credits_str!
      .split(';')
      .filter((x) => x.length > 0)
      .map((str) => SfxCreditS.decode(str));

    return {
      sfxList,
      credits,
    };
  }

  static populateMusic() {
    const musicLib_dat = fs.readFileSync(`${GD_DATA_PATH}/musiclibrary.dat`);
    const musicLib = zlib
      .inflateSync(Buffer.from(musicLib_dat.toString('utf8'), 'base64url'))
      .toString('utf8');

    const [version, artistList_str, musicList_str, tagList_str] =
      musicLib.split('|');

    const regex =
      /^(.*?),(.*),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?)$/;

    const ArtistS = TR.DelimArr<Artist>(ArtistM, ArtistSM, ',');
    const MusicS = TR.DelimArr<Music>(MusicM, MusicSM, '\x0B');
    const TagsS = TR.DelimArr<Tag>(TagM, TagSM, ',');

    const artistList = artistList_str!
      .split(';')
      .filter((str) => str.length > 0)
      .map((str) => ArtistS.decode(str));
    const musicList = musicList_str!
      .split(';')
      .filter((str) => str.length > 0)
      .map((str) => {
        return str.match(regex)!.slice(1, 13).join('\x0B')!;
      })
      .map((str) => MusicS.decode(str));
    const tagList = tagList_str!
      .split(';')
      .filter((str) => str.length > 0)
      .map((str) => TagsS.decode(str));

    return {
      version: parseInt(version!),
      artistList,
      musicList,
      tagList,
    };
  }
}
