import { B64Dec, B64Enc, B64urlDec, B64urlEnc, XOR } from '../utils';

export function IndexMap(
  keyMap: Record<number, string>
): Record<string, number> {
  const indexMap: Record<string, number> = {};
  Object.entries(keyMap).forEach((k) => (indexMap[k[1]] = parseInt(k[0])));
  return indexMap;
}

export type Serializer<T> = {
  decode(str: string): T;
  encode(obj: T): string;
};

export type SerializeMap = Record<number, Serializer<unknown>> & {
  default?: Serializer<unknown>;
};

export type KeyMap = Record<number, string>;

export const Number: Serializer<number | undefined> = {
  decode(str) {
    if (str === '') return undefined;
    return parseFloat(str);
  },
  encode(obj) {
    if (obj === undefined) return '';
    return obj.toString();
  },
};

export const BooleanNum: Serializer<boolean | undefined> = {
  decode(str) {
    if (str === '1') return true;
    if (str === '0') return false;
    if (str === '') return undefined;
    throw new Error('Unexpected value');
  },
  encode(obj) {
    if (obj === undefined) return '';
    return obj ? '1' : '0';
  },
};

export const Boolean: Serializer<boolean> = {
  decode(str) {
    if (str === 'true') return true;
    if (str === 'false') return false;
    throw new Error('Unexpected value');
  },
  encode(obj) {
    return obj ? 'true' : 'false';
  },
};

export const NumberArray: Serializer<number[]> = {
  decode(str) {
    if (str.length == 0) return [];
    return str.split(',').map((i) => parseInt(i));
  },
  encode(obj) {
    return obj.join(',');
  },
};

export const UrlEncoded: Serializer<string> = {
  decode(str) {
    return decodeURIComponent(str);
  },
  encode(obj) {
    return encodeURIComponent(obj);
  },
};

export const NoSerializer: Serializer<string> = {
  decode: (str) => {
    return str;
  },
  encode(obj) {
    return obj;
  },
};

// str(timestamp in seconds) <-> DateTime
export const DateTime: Serializer<Date | undefined> = {
  decode(str) {
    if (str == '0' || str == '') return undefined;
    return new Date(parseInt(str) * 1000);
  },
  encode(obj) {
    if (!obj) return '0';
    return (obj.getTime() / 1000).toString();
  },
};

export function XorB64url(key: string): Serializer<string> {
  return {
    decode: (str) => XOR(B64urlDec(str), key),
    encode: (obj) => B64urlEnc(XOR(obj, key)),
  };
}

export function XorB64(key: string): Serializer<string> {
  return {
    decode: (str) => XOR(B64Dec(str), key),
    encode: (obj) => B64Enc(XOR(obj, key)),
  };
}

export function DelimObj<T extends Record<string, unknown>>(
  keyMap: KeyMap,
  serializeMap: SerializeMap,
  delimiter: string
): Serializer<T> {
  return {
    decode(str) {
      if (str.length == 0) return {} as T;

      const array = str.split(delimiter);
      if (array.length % 2 != 0)
        throw new Error('Expected even number of elements');

      const obj: Record<string, unknown> = {};
      for (let i = 0; i < array.length; i += 2) {
        let n: number = parseInt(array[i]!);

        const v = keyMap[n];

        if (v === undefined) throw new Error('Unknown');

        const serializer =
          serializeMap[n] ?? serializeMap.default ?? NoSerializer;
        obj[v] = serializer.decode(array[i + 1]!);
      }
      return obj as T;
    },
    encode(obj) {
      const mapR = IndexMap(keyMap);
      const list: string[] = [];
      Object.entries(obj).forEach((item) => {
        let n: number = mapR[item[0]]!;
        list.push(n.toString());
        const serializer =
          serializeMap[n] ?? serializeMap.default ?? NoSerializer;
        list.push(serializer.encode(item[1]));
      });

      const res = list.join(delimiter);
      return res;
    },
  };
}

export function DelimArr<T extends Record<string, unknown>>(
  keyMap: KeyMap,
  serializeMap: SerializeMap,
  delimiter: string
): Serializer<T> {
  return {
    decode(str) {
      if (str.length == 0) return {} as T;
      const obj: Record<string, unknown> = {};
      const list = str.split(delimiter);
      if (list.length != Object.keys(keyMap).length) {
        throw new Error(
          `Count Mismatch \n Expected: ${Object.keys(keyMap).length} \n Got: ${list.length}`
        );
      }

      Object.keys(keyMap).forEach((index_num) => {
        const index = parseInt(index_num);
        const serializer =
          serializeMap[index] ?? serializeMap.default ?? NoSerializer;
        obj[keyMap[index]!] = serializer.decode(list[index]!);
      });

      return obj as T;
    },
    encode(obj) {
      const list: string[] = [];
      if (Object.keys(obj).length != Object.keys(keyMap).length) {
        throw new Error('Count Mismatch');
      }

      Object.keys(keyMap).forEach((index_num) => {
        const index = parseInt(index_num);
        const serializer =
          serializeMap[index] ?? serializeMap.default ?? NoSerializer;
        list.push(serializer.encode(obj[keyMap[index]!]));
      });
      const res = list.join(delimiter);
      return res;
    },
  };
}

export const PageS = DelimArr<{
  total: number;
  start: number;
  count: number;
}>(
  {
    0: 'total',
    1: 'start',
    2: 'count',
  },
  { default: Number },
  ':'
);

export const ColorS = DelimArr<{
  R: number;
  G: number;
  B: number;
}>(
  {
    0: 'R',
    1: 'G',
    2: 'B',
  },
  { default: Number },
  ','
);
