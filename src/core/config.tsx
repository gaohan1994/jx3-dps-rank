import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import sl_yjj from '../assets/sl_yjj.png';
import cy_txjy from '../assets/cy_txjy.png';
import cy_zxg from '../assets/cy_zxg.png';
import lx_yl from '../assets/lx-yl.png';
import pl_lh from '../assets/pl-lx.png';
import cg_mw from '../assets/cg-mw.png';
import bd_ba from '../assets/bg-ba.png';
import cy_fs from '../assets/cy-fs.png';

import { GameProfessionNames } from './profession';
import { GameClassesNames } from './classes';

/**
 * 人物属性值
 * @param UserAttributeKeys
 */
export const UserAttributeKeys = [
  {
    value: 'YuanQi',
    title: '元气',
  },
  {
    value: 'JiChuGongJi',
    title: '基础攻击',
  },
  {
    value: 'HuiXin',
    title: '会心',
    suffix: '%'
  },
  {
    value: 'HuiXiao',
    title: '会效',
    suffix: '%'
  },
  {
    value: 'PoFang',
    title: '破防',
    suffix: '%'
  },
  {
    value: 'PoZhao',
    title: '破招',
  },
  {
    value: 'WuShuang',
    title: '无双',
    suffix: '%'
  },
  {
    value: 'JiaSu',
    title: '加速',
  },
  {
    value: 'WuQiShangHai',
    title: '武器伤害',
    suffix: (
      <Tooltip title="输入武器伤害计算更加准确" >
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    ),
    nullToken: false
  },
];

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

/**
 * 凌雪阁门派
 */
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

/**
 * 蓬莱门派
 */

const LingHaiJue: GameClass = {
  profession: GameProfessionNames.PengLai,
  professionName: '蓬莱',
  class: GameClassesNames.LingHaiJue,
  className: '凌海决',
  color: [191, 170, 229],
  icon: pl_lh,
}

const PengLai = {
  [GameClassesNames.LingHaiJue]: LingHaiJue
}

/**
 * 长歌门
 */

const MoWen: GameClass = {
  profession: GameProfessionNames.ChangeGe,
  professionName: '长歌门',
  class: GameClassesNames.MoWen,
  className: '莫问',
  color: [70, 165, 133],
  icon: cg_mw,
}
const ChangeGe = {
  [GameClassesNames.MoWen]: MoWen
}

/**
 * 霸刀
 */

const BeiAoJue: GameClass = {
  profession: GameProfessionNames.BaDao,
  professionName: '霸刀',
  class: GameClassesNames.BeiAoJue,
  className: '北傲决',
  color: [61, 65, 128],
  icon: bd_ba,
}
const BaDao = {
  [GameClassesNames.BeiAoJue]: BeiAoJue
}

/**
 * 苍云
 */

const FenShanJin: GameClass = {
  profession: GameProfessionNames.CangYun,
  professionName: '苍云',
  class: GameClassesNames.FenShanJin,
  className: '分山劲',
  color: [166, 55, 1],
  icon: cy_fs,
}
const CangYun = {
  [GameClassesNames.FenShanJin]: FenShanJin
}

/**
 * 
 * 丐帮
 */

const XiaoChenJue: GameClass = {
  profession: GameProfessionNames.GaiBang,
  professionName: '丐帮',
  class: GameClassesNames.XiaoChenJue,
  className: '笑尘决',
  color: [155, 105, 50],
  icon: lx_yl,
}
const GaiBang = {
  [GameClassesNames.XiaoChenJue]: XiaoChenJue
}

/**
 * 
 * 明教
 */

const FenYingShengJue: GameClass = {
  profession: GameProfessionNames.MingJiao,
  professionName: '明教',
  class: GameClassesNames.FenYingShengJue,
  className: '焚影圣诀',
  color: [205, 78, 19],
  icon: lx_yl,
}
const MingJiao = {
  [GameClassesNames.FenYingShengJue]: FenYingShengJue
}

/**
 * 
 * 唐门
 */

const JingYuJue: GameClass = {
  profession: GameProfessionNames.TangMen,
  professionName: '唐门',
  class: GameClassesNames.JingYuJue,
  className: '惊羽诀',
  color: [7, 120, 128],
  icon: lx_yl,
}

const TianLuoGuiDao: GameClass = {
  profession: GameProfessionNames.TangMen,
  professionName: '唐门',
  class: GameClassesNames.TianLuoGuiDao,
  className: '天罗诡道',
  color: [7, 120, 128],
  icon: lx_yl,
}
const TangMen = {
  [GameClassesNames.JingYuJue]: JingYuJue,
  [GameClassesNames.TianLuoGuiDao]: TianLuoGuiDao
}

/**
 * 
 * 五毒
 */
const DuJing: GameClass = {
  profession: GameProfessionNames.WuDu,
  professionName: '五毒',
  class: GameClassesNames.DuJing,
  className: '毒经',
  color: [53, 30, 118],
  icon: lx_yl,
}
const WuDu = {
  [GameClassesNames.DuJing]: DuJing
}

/**
 * 
 * 藏剑
 */
const CangJianClass: GameClass = {
  profession: GameProfessionNames.CangJian,
  professionName: '藏剑',
  class: GameClassesNames.CangJian,
  className: '藏剑',
  color: [179, 182, 15],
  icon: lx_yl,
}
const CangJian = {
  [GameClassesNames.CangJian]: CangJianClass
}

/**
 * 
 * 天策
 */

const AoXueZhanYi: GameClass = {
  profession: GameProfessionNames.TianCe,
  professionName: '天策',
  class: GameClassesNames.AoXueZhanYi,
  className: '傲血战意',
  color: [162, 6, 6],
  icon: lx_yl,
}
const TianCe = {
  [GameClassesNames.AoXueZhanYi]: AoXueZhanYi
}


/**
 * 返回所有游戏职业
 * 
 * @param GameProfessions
 */
const GameProfessions: { [name: string]: any } = {
  [GameProfessionNames.ShaoLin]: ShaoLin,
  [GameProfessionNames.ChunYang]: ChunYang,
  [GameProfessionNames.LingXueGe]: LingXueGe,
  [GameProfessionNames.PengLai]: PengLai,
  [GameProfessionNames.CangJian]: CangJian,
  [GameProfessionNames.CangYun]: CangYun,
  [GameProfessionNames.ChangeGe]: ChangeGe,
  [GameProfessionNames.GaiBang]: GaiBang,
  [GameProfessionNames.MingJiao]: MingJiao,
  [GameProfessionNames.TangMen]: TangMen,
  [GameProfessionNames.TianCe]: TianCe,
  [GameProfessionNames.WuDu]: WuDu,
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