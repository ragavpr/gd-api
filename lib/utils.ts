import * as crypto from 'crypto';

export function SHA1(input: string) {
    const saltedInput = input;
    const hash = crypto.createHash('sha1');
    hash.update(saltedInput);
    return hash.digest()
}
