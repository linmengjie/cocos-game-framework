/**
 * 状态表
 */
export class StateTable<TKey extends string, TValue> {
  constructor(source: { [K in TKey]: TValue }) {
    this.source = new Map(Object.entries(source)) as any;
  }

  /** 存储 */
  private source: Map<TKey, TValue> = new Map();

  /**
   * 判断是否包含某个状态
   * @param key
   */
  has(key: TKey): boolean {
    return this.source.has(key);
  }

  /**
   * 获取某个状态的值
   * @param key
   */
  get(key: TKey): TValue {
    return this.source.get(key);
  }

  /**
   * 获取全部状态
   */
  get_all() {
    return this.source;
  }

  /**
   * 新增某个状态
   * @param key
   * @param value
   */
  add(key: TKey, value = null) {
    this.source.set(key, value);
  }

  /**
   * 删除某个状态
   * @param key
   * @param value
   */
  del(key: TKey, value = null) {
    this.source.delete(key);
  }

  /** 输出所有的状态key */
  log_keys(): string {
    return JSON.stringify([...this.source.keys()]);
  }
}
