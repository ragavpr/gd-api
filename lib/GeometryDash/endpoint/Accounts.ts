import { GJEndpoint } from './GJEndpoint';
import * as TR from '../helper/Serializers';
import * as T from '../helper/types';
import { secret, salt } from '../hidden';
import { saltedSHA1 } from '../utils';

import * as crypto from 'crypto';

import { GD_API_ENDPOINT, GD_VERIFY_RESPONSES } from '../env';

const endpoint = `${GD_API_ENDPOINT}/database/accounts`;

export class LoginGJAccount extends GJEndpoint {
  static #errors = {
    '-1': 'Generic Error',
    '-8': "user's password is less than 6 characters long",
    '-9': "user's Username is less than 3 characters long",
    '-11': "user's login credentials are incorrect",
    '-12': "user's account is disabled",
    '-13':
      'user is trying to log into has a different steam ID to to that account',
  };

  static #serializer = TR.DelimArr(
    {
      0: 'accountID',
      1: 'playerID',
    },
    { default: TR.Number },
    ','
  );

  static decode = this.#serializer.decode;
  static encode = this.#serializer.encode;

  static async call(
    state: T.State,
    userName: string,
    password: string,
    sID: number = 0
  ) {
    const gjp2 = saltedSHA1(password, salt.gjp2);
    const response = await this.callEndpoint(
      state,
      `${endpoint}/loginGJAccount.php`,
      {
        userName,
        gjp2,
        sID,
        secret: secret.user,
      },
      0b010
    );
    //TODO throw errors in common call
    return {
      ...this.decode(response.body),
      userName,
      password,
      gjp2,
      sID,
    } as T.State['user'];
  }
}
