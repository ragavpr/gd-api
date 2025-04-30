import { MD5 } from "../../utils";

import got from "got";

import { GD_AUDIOLIB_ENDPOINT } from "../env";
import { salt } from "../hidden";

const endpoint = `${GD_AUDIOLIB_ENDPOINT}`;

export function getToken(url: URL) {
    const expires = Math.floor(Date.now()/1000) + 3600;
    return {
        token: MD5(`${salt.cdnTokenUUID}${url.pathname}${expires}`).toString('base64url'),
        expires
    }
}

export class MusicLibrary {
    static async getVersion(version = 2) {
        const str_version = version > 1 ? `_${version.toString().padStart(2, "0")}` : ""
        const url = new URL(`${endpoint}/music/musiclibrary_version${str_version}.txt`);
        
        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.body;
    }

    static async downloadIndex(version = 2) {
        const str_version = version > 1 ? `_${version.toString().padStart(2, "0")}` : ""
        const url = new URL(`${endpoint}/music/musiclibrary${str_version}.dat`);

        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.rawBody;
    }

    static async download(musicID: number) {
        const url = new URL(`${endpoint}/music/${musicID}.mp3`);

        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.rawBody;
    }
}

export class SFXLibrary {
    static async getVersion(version = 1) {
        const str_version = version > 1 ? `_${version.toString().padStart(2, "0")}` : ""
        const url = new URL(`${endpoint}/sfx/sfxlibrary_version${str_version}.txt`);
        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.body;
    }

    static async downloadIndex(version = 1) {
        const str_version = version > 1 ? `_${version.toString().padStart(2, "0")}` : ""
        const url = new URL(`${endpoint}/sfx/sfxlibrary${str_version}.dat`);

        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.rawBody;
    }

    static async download(sfxID: number) {
        const url = new URL(`${endpoint}/sfx/s${sfxID}.ogg`);

        const response = await got.get(url, {
            searchParams: getToken(url)
        });
        return response.rawBody;
    }
}
