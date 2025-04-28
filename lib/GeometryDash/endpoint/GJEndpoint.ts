import type { State } from "../types";

import got from 'got';

export abstract class GJEndpoint {
  protected static callEndpoint(
    state: State,
    url: string,
    form_args: object,
    trackers = 0b000
  ) {
    // const url = `${GD_API_ENDPOINT}/database/${endpoint}.php`;

    const form: Record<string, unknown> = {};

    if (trackers & 0b100) {
      Object.assign(form, {
        //TODO: Store Client Version in a separate file
        gameVersion: 22,
        binaryVersion: 45,
      });
    }

    if (trackers & 0b010) {
      form.udid = state.device.udid;
      form.uuid = state.user?.playerID ?? 0;
    }

    if (trackers & 0b001 && state.user) {
      form.accountID = state.user!.accountID;
      form.gjp2 = state.user!.gjp2;
    }
    Object.assign(form, form_args);

    //Delete undefined values
    Object.keys(form).forEach((key) => {
      if (form[key as keyof typeof form] === undefined) {
        delete form[key as keyof typeof form];
      }
    });

    console.log("CALLING", url, `\n`, form);

    return got.post(url, {
      headers: {
        "User-Agent": process.versions.bun ? "" : undefined, //Bun sets a default user agent if undefined
      },
      form,
      throwHttpErrors: false,
    });
  }
  static encode(obj: unknown): string {
    throw new Error("Method not implemented.");
  }
  static decode(ori: string): unknown {
    throw new Error("Method not implemented.");
  }
  static hash(any: unknown): string {
    throw new Error("Method not implemented.");
  }
}
