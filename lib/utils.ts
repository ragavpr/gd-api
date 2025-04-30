import * as crypto from 'crypto';

function hash(algorithm: string) {
  return (input: crypto.BinaryLike) => {
    const hash = crypto.createHash(algorithm);
    hash.update(input);
    return hash.digest();
  };
}

export const SHA256 = hash('sha256');
export const SHA1 = hash('sha1');
export const MD5 = hash('md5');
