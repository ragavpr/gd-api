import * as crypto from 'crypto';

export function SHA1(input: crypto.BinaryLike) {
  const hash = crypto.createHash('sha1');
  hash.update(input);
  return hash.digest();
}

export function MD5(input: crypto.BinaryLike) {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest();
}
