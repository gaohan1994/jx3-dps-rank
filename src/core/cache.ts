/**
 * 历史记录
 * 
 * 保存内容
 * - 保存角色属性
 * 
 * 保存方式
 * - 自动保存 | 手动保存
 * 
 * 导入功能
 * - 自动导入 + 手动导入
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-09-02 14:34:09 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-02 15:12:59
 */

class Cache {
  static Keys = {
    // 保存人物属性的历史记录
    Core: 'Jx3DpsCalculator-Core'
  }
  /**
   * 历史记录控制器
   *
   * @private
   * @type {Storage}
   * @memberof Cache
   */
  private controller: Storage;

  /**
   * Creates an instance of Cache.
   * 初始化 Cache 获取本地历史记录并赋值给 Cache 类
   * @memberof Cache
   */
  constructor() {
    this.controller = window.localStorage;
  }

  /**
   * 保存 core 属性
   *
   * @param {*} value
   * @memberof Cache
   */
  public saveCoreAttributes(value: any): void {
    this.controller.setItem(Cache.Keys.Core, typeof value === 'string' ? value : JSON.stringify(value));
  }

  /**
   * 返回最近一次的 Core 历史记录
   *
   * @return {*} 
   * @memberof Cache
   */
  public getLastCore() {
    const value = this.controller.getItem(Cache.Keys.Core);
    return value !== null ? JSON.parse(value) : undefined;
  }

  /**
   * 返回是否有历史记录
   *
   * @return {*}  {boolean}
   * @memberof Cache
   */
  public hasLastCore(): boolean {
    const core = this.getLastCore();
    return core !== undefined;
  }
}

export default new Cache();