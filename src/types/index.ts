import GameCore from '../core/game';

/**
 * 排名接口
 *
 * @export
 * @interface RankInterface
 */
export interface RankInterface {
  /**
   * 排名头像
   *
   * @type {string}
   * @memberof RankInterface
   */
  avatar: string;
  /**
   * 职业名称
   *
   * @type {string}
   * @memberof RankInterface
   */
  name: string;
  /**
   * 排名dps
   *
   * @type {string}
   * @memberof RankInterface
   */
  dps: string;
  /**
   * 排名职业
   *
   * @type {GameClass}
   * @memberof RankInterface
   */
  class: GameCore;
}
