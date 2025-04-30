import fs from 'fs-extra';

export interface IStore<T> {
  save(state: T): void;
  load(): T;
}

export class NoPersistence<T> implements IStore<T> {
  state: T;

  constructor(state?: T) {
    this.state = state || ({} as T);
  }

  save(state: T) {
    return;
  }

  load(): T {
    return this.state;
  }
}

export class FilePersistence<T> implements IStore<T> {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  save(state: T): void {
    fs.writeJSONSync(this.path, state);
  }

  load(): T {
    if (!fs.existsSync(this.path)) {
      fs.ensureFileSync(this.path);
      fs.writeJSONSync(this.path, {});
    }
    return fs.readJSONSync(this.path);
  }
}
