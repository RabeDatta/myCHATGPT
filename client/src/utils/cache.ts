// cache.ts
class Cache {
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export default new Cache();
