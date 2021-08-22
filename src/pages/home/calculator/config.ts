import img1 from '../../../assets/assets-shaolin/10.png';
import img2 from '../../../assets/assets-shaolin/16.png';
import img3 from '../../../assets/assets-shaolin/29.png';
import img4 from '../../../assets/assets-shaolin/37.png';
import img5 from '../../../assets/assets-shaolin/42.png';

import { CoreHelper } from 'jx3-dps-core';

export const GroupSkills = [
  {
    title: '弘法',
    value: CoreHelper.GroupSkills.HongFa
  },
  {
    title: '立地成佛',
    value: CoreHelper.GroupSkills.LiDiChengFo
  },
  {
    title: '朝圣言',
    value: CoreHelper.GroupSkills.ChaoShengYan
  },
  {
    title: '戒火斩',
    value: CoreHelper.GroupSkills.JieHuoZhan
  },
  {
    title: '烈日斩',
    value: CoreHelper.GroupSkills.LieRiZhan
  },
  {
    title: '号令三军',
    value: CoreHelper.GroupSkills.HaoLingSanJun
  },
  {
    title: '梅花盾',
    value: CoreHelper.GroupSkills.MeiHuaDun
  },
];

export const TeamSkills = [
  {
    title: '分澜',
    value: CoreHelper.TeamSkills.FenLan
  },
  {
    title: '破苍穹',
    value: CoreHelper.TeamSkills.PoCangQiong
  },
  {
    title: '秀气',
    value: CoreHelper.TeamSkills.XiuQi
  },
]

export const SetBoenus = [
  {
    title: '无套装',
    value: '',
  },
  {
    title: '4件套（双会+技能加成）',
    value: `${CoreHelper.SetBonusesGain.SkillSetBonuse},${CoreHelper.SetBonusesGain.ValueSetBonuse}`,
  },
  {
    title: '只有属性套（双会加成）',
    value: CoreHelper.SetBonusesGain.ValueSetBonuse,
  },
  {
    title: '只有技能套（技能加成）',
    value: CoreHelper.SetBonusesGain.SkillSetBonuse,
  },
];

export const formations = [
  {
    title: '无阵',
    value: '',
  },
  {
    title: '和尚阵',
    value: CoreHelper.Formations.TianGuLeiYinZhen
  },
  {
    title: '毒经阵',
    value: CoreHelper.Formations.DuJingZhen
  },
  {
    title: '气纯阵',
    value: CoreHelper.Formations.QiChunZhen
  },
  {
    title: '田螺阵',
    value: CoreHelper.Formations.TianLuoZhen
  },
];

export const skillIcons = {
  WeiTuoXianChu: img1,
  ShouQueShi: img2,
  NaYunShi: img3,
  HengSaoLiuHe: img4,
  HengSaoLiuHeDot: img4,
  PuDuSiFang: img5,

  LiuHeGun: undefined,
  SuoDi: undefined,
  TiHuGuanDing: undefined,
  FoGuo: undefined,
  PoZhao: undefined,
  EnChantShoe: undefined,
}