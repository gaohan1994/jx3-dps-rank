import sl_yjj from '../assets/sl_yjj.png';
import cy_txjy from '../assets/cy_txjy.png';
import cy_zxg from '../assets/cy_zxg.png';
import lx_yl from '../assets/lx-yl.png';
import { GameProfessionNames } from './profession';
import { GameClassesNames } from './classes'

/**
 * 游戏职业详情
 *
 * @export
 * @interface GameProfession
 */
export interface GameClass {
  /**
   * 职业名称
   *
   * @type {string}
   * @memberof GameClass
   */
  profession: GameProfessionNames;
  /**
   * 职业名称中文
   *
   * @type {string}
   * @memberof GameClass
   */
  professionName: string;
  /**
   * 职业心法
   *
   * @type {string}
   * @memberof GameClass
   */
  class: GameClassesNames;
  /**
   * 职业心法中文
   *
   * @type {string}
   * @memberof GameClass
   */
  className: string;
  /**
   * 职业颜色
   *
   * @type {string}
   * @memberof GameClass
   */
  color: number[];
  /**
   * 职业图标
   *
   * @type {string}
   * @memberof GameClass
   */
  icon: string;

  /**
   * 职业流派 (保留字段)
   *
   * @type {string}
   * @memberof GameClass
   */
  genre?: string;
}

/**
 * 少林派
 * 
 * @param ShaoLin
 */
const YiJinJing: GameClass = {
  profession: GameProfessionNames.ShaoLin,
  professionName: '少林',
  class: GameClassesNames.YiJinJing,
  className: '易筋经',
  color: [145, 134, 29],
  icon: sl_yjj,
};

const ShaoLin = {
  [GameClassesNames.YiJinJing]: YiJinJing
}

/**
 * 纯阳派
 * 
 * @param ZiXiaGong
 * 
 * @param TaiXuJianYi
 */
const ZiXiaGong: GameClass = {
  profession: GameProfessionNames.ChunYang,
  professionName: '纯阳',
  class: GameClassesNames.ZiXiaGong,
  className: '紫霞功',
  color: [53, 133, 184],
  icon: cy_zxg,
}

const TaiXuJianYi: GameClass = {
  profession: GameProfessionNames.ChunYang,
  professionName: '纯阳',
  class: GameClassesNames.TaiXuJianYi,
  className: '太虚剑意',
  color: [53, 133, 184],
  icon: cy_txjy,
}

const ChunYang = {
  [GameClassesNames.ZiXiaGong]: ZiXiaGong,
  [GameClassesNames.TaiXuJianYi]: TaiXuJianYi,
}

const YinLongJue: GameClass = {
  profession: GameProfessionNames.LingXueGe,
  professionName: '凌雪阁',
  class: GameClassesNames.YinLongJue,
  className: '隐龙诀',
  color: [0, 0, 0],
  icon: lx_yl,
}

const LingXueGe = {
  [GameClassesNames.YinLongJue]: YinLongJue
}
const PengLai = {

}
const ChangeGe = {

}
const BaDao = {

}
const CangYun = {

}
const GaiBang = {

}
const MingJiao = {

}
const TangMen = {

}
const WuDu = {

}
const CangJian = {

}
const TianCe = {

}


/**
 * 返回所有游戏职业
 * 
 * @param GameProfessions
 */
const GameProfessions: { [name: string]: any } = {
  [GameProfessionNames.ShaoLin]: ShaoLin,
  [GameProfessionNames.ChunYang]: ChunYang,
  [GameProfessionNames.LingXueGe]: LingXueGe
}

/**
 * 获取游戏门派数据
 *
 * @param {GameProfessionNames} profession
 * @return {*} 返回门派
 */
function getGameProfession(profession: GameProfessionNames) {
  return GameProfessions[profession];
}

/**
 * 获取游戏心法
 *
 * @param {GameProfessionNames} profession
 * @param {GameClassesNames} className
 * @return {*} 
 */
function getGameClass(profession: GameProfessionNames, className: GameClassesNames) {
  return GameProfessions[profession][className];
}

export {
  GameProfessionNames,
  GameClassesNames,

  GameProfessions,

  getGameProfession,
  getGameClass,
}