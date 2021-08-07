import invariant from 'invariant';
import numeral from 'numeral';
import { GameProfessionNames, GameClassesNames, getGameClass, GameClass } from './config'

/**
 * 创建游戏职业类的参数
 *
 * @interface GameClassOptions
 */
interface GameClassOptions {
  /**
   * 游戏职业
   *
   * @type {string}
   * @memberof GameClassOptions
   */
  profession: GameProfessionNames;

  /**
   * 游戏心法
   *
   * @type {string}
   * @memberof GameClassOptions
   */
  class: GameClassesNames;

  /**
   * 职业dps
   *
   * @type {string}
   * @memberof GameClassOptions
   */
  dps: string;

  /**
   * dps最高的职业
   *
   * @type {string}
   * @memberof GameClassOptions
   */
  topGameClass?: GameCore;
}

/**
 * 游戏职业类
 * 
 * 这个类提供职业相关信息
 *
 * @class GameClass
 */
class GameCore {

  /**
   * 游戏职业名称
   *
   * @memberof GameCore
   */
  public profession: GameProfessionNames;

  /**
   * 游戏心法名称
   *
   * @memberof GameCore
   */
  public class: GameClassesNames;

  /**
   * 游戏心法
   *
   * @memberof GameCore
   */
  public gameClass: GameClass;

  /**
   * 职业dps
   *
   * @type {string}
   * @memberof GameCore
   */
  public dps: string;

  /**
   * dps最高的心法
   *
   * @type {GameClass}
   * @memberof GameCore
   */
  public topGameClass: GameCore;

  options: GameClassOptions;

  constructor(options: GameClassOptions) {
    this.options = options;

    invariant(!!options.profession, '游戏职业不能为空');
    invariant(!!options.class, '游戏心法不能为空');
    invariant(!!options.dps, 'dps不能为空！');

    this.profession = options.profession;

    this.class = options.class;

    this.dps = options.dps;

    this.topGameClass = options.topGameClass || this;

    /**
     * 获取当前游戏具体心法
     * 
     * @method getGameClass 
     */
    const gameClass = getGameClass(this.profession, this.class);

    this.gameClass = gameClass;
  }

  /**
   * 获取职业颜色
   *
   * @return {*} 
   * @memberof GameCore
   */
  public getColor() {
    return this.gameClass.color;
  }

  /**
   * 获取职业门派
   *
   * @return {*} 
   * @memberof GameCore
   */
  public getProfessionName() {
    return this.gameClass.professionName;
  }

  /**
   * 获取职业心法
   *
   * @return {*} 
   * @memberof GameCore
   */
  public getClassName() {
    return this.gameClass.className;
  }

  /**
   * 获取心法图标
   *
   * @return {*} 
   * @memberof GameCore
   */
  public getIcon() {
    return this.gameClass.icon;
  }

  /**
   * 获取心法dps
   *
   * @return {*} 
   * @memberof GameCore
   */
  public getDps() {
    return this.dps;
  }

  /**
   * 获得当前dps / 最大dps百分比
   *
   * @memberof GameCore
   */
  public getPercent() {
    const currentDps = Number(this.getDps());
    const maxDps = Number(this.topGameClass.getDps());

    return numeral(currentDps / maxDps * 100).format('0.00');
  }
}

export default GameCore;