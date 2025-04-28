export function IndexMap(keyMap: Record<number, string>): Record<string, number> {
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
}

export type KeyMap = Record<number, string>

export const Number: Serializer<number> = {
  decode(str) {
    return parseFloat(str);
  },
  encode(obj) {
    return obj.toString();
  },
};

export const BooleanNum: Serializer<boolean> = {
  decode(str) {
    if (str === "1") return true;
    if (str === "0") return false;
    throw new Error("Unexpected value");
  },
  encode(obj) {
    return obj ? "1" : "0";
  },
};

export const Boolean: Serializer<boolean> = {
  decode(str) {
    if (str === "true") return true;
    if (str === "false") return false;
    throw new Error("Unexpected value");
  },
  encode(obj) {
    return obj ? "true" : "false";
  },
};

export const NumberArray: Serializer<number[]> = {
  decode(str) {
    if (str.length == 0) return [];
    return str.split(",").map((i) => parseInt(i));
  },
  encode(obj) {
    return obj.join(",");
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
        throw new Error("Expected even number of elements");

      const obj: Record<string, unknown> = {};
      for (let i = 0; i < array.length; i += 2) {
        let n: number = parseInt(array[i]!);

        const v = keyMap[n];

        if (v === undefined) throw new Error("Unknown");

        const serializer = serializeMap[n] ?? serializeMap.default ?? NoSerializer;
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
        const serializer = serializeMap[n] ?? serializeMap.default ?? NoSerializer;
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
        throw new Error(`Count Mismatch \n Expected: ${Object.keys(keyMap).length} \n Got: ${list.length}`);
      }

      Object.keys(keyMap).forEach((index_num) => {
        const index = parseInt(index_num);
        const serializer = serializeMap[index] ?? serializeMap.default ?? NoSerializer;
        obj[keyMap[index]!] = serializer.decode(list[index]!);
      })

      return obj as T;
    },
    encode(obj) {
      const list: string[] = [];
      if(Object.keys(obj).length != Object.keys(keyMap).length) {
        throw new Error("Count Mismatch");
      }

      Object.keys(keyMap).forEach((index_num) => {
        const index = parseInt(index_num);
        const serializer = serializeMap[index] ?? serializeMap.default ?? NoSerializer;
        list.push(serializer.encode(obj[keyMap[index]!]));
      })
      const res = list.join(delimiter);
      return res;
    },
  }
}
