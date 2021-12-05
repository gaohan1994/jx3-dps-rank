import { CoreHelper } from 'jx3-dps-core';

export const GroupSkills = [
  {
    title: '立地成佛',
    value: CoreHelper.GroupSkills.LiDiChengFo,
  },
  {
    title: '戒火斩',
    value: CoreHelper.GroupSkills.JieHuoZhan,
  },
  {
    title: '烈日斩',
    value: CoreHelper.GroupSkills.LieRiZhan,
  },
  {
    title: '寒宵千军',
    value: CoreHelper.GroupSkills.HanXiaoQianJun,
  },
  // {
  //   title: '号令三军',
  //   value: CoreHelper.GroupSkills.HaoLingSanJun
  // },

  // {
  //   title: '朝圣言',
  //   value: CoreHelper.GroupSkills.ChaoShengYan
  // },
];

export const TeamSkills = [
  {
    title: '分澜',
    value: CoreHelper.TeamSkills.FenLan,
  },
  {
    title: '破苍穹',
    value: CoreHelper.TeamSkills.PoCangQiong,
  },
  {
    title: '秀气',
    value: CoreHelper.TeamSkills.XiuQi,
  },
];

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

export const Formations = [
  {
    title: '无阵',
    value: '',
  },
  {
    title: '和尚阵',
    value: CoreHelper.Formations.TianGuLeiYinZhen,
  },
  {
    title: '毒经阵',
    value: CoreHelper.Formations.DuJingZhen,
  },
  {
    title: '气纯阵',
    value: CoreHelper.Formations.QiChunZhen,
  },
  {
    title: '田螺阵',
    value: CoreHelper.Formations.TianLuoZhen,
  },
  {
    title: '莫问阵',
    value: CoreHelper.Formations.MoWenZhen,
  },
];

export const Weapons = [
  {
    title: '普通武器',
    value: CoreHelper.Weapons.Normal,
  },
  {
    title: '橙武',
    value: CoreHelper.Weapons.CW,
  },
  {
    title: '水特效武器',
    value: CoreHelper.Weapons.EffectWather,
  },
];

export const EnChants = [
  {
    title: '腰带附魔',
    value: CoreHelper.Enchants.EnChantBelt,
  },
  {
    title: '衣服附魔',
    value: CoreHelper.Enchants.EnChantBody,
  },
  {
    title: '头盔附魔',
    value: CoreHelper.Enchants.EnChantHead,
  },
];

export const Spine = [
  {
    title: '特效腰椎',
    value: CoreHelper.EffectSpines.XiangMeng,
  },
];

export const Banquet = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '水煮鱼 无双+100',
    value: CoreHelper.Banquet.ShuiZhuYu,
  },
  {
    title: '二十四桥 基础214 会心397 破招397',
    value: CoreHelper.Banquet.ErShiSiQiaoMingYueYe,
  },
  {
    title: '同泽宴 无双+130',
    value: CoreHelper.Banquet.TongZeYan,
  },
  {
    title: '蒸鱼菜盘 无双+517',
    value: CoreHelper.Banquet.ZhengYuCaiPan,
  },
];

export const FoodEnchance = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '灌汤包 基础攻击+374',
    value: CoreHelper.Food.FoodEnhance.GuanTangBao,
  },
  {
    title: '白肉血肠 破招+695',
    value: CoreHelper.Food.FoodEnhance.BaiRouXueChang,
  },
  {
    title: '红烧排骨 破防+695',
    value: CoreHelper.Food.FoodEnhance.HongShaoPaiGu,
  },
  {
    title: '酸菜鱼 会心+695',
    value: CoreHelper.Food.FoodEnhance.SuanCaiYu,
  },
];

export const FoodSupport = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '鱼片砂锅粥 元气+156',
    value: CoreHelper.Food.FoodSupport.YuPianShaGuoZhou,
  },
];

export const DrugEnhance = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '上品展凤丹 基础+481',
    value: CoreHelper.Food.DrugEnhance.ShangPinZhanFengDan,
  },
  {
    title: '上品凝神散 破招+894',
    value: CoreHelper.Food.DrugEnhance.ShangPinNingShenSan,
  },
  {
    title: '上品破秽散 破防+894',
    value: CoreHelper.Food.DrugEnhance.ShangPinPoHuiSan,
  },
  {
    title: '上品玉离散 会心+894',
    value: CoreHelper.Food.DrugEnhance.ShangPinYuLiSan,
  },
];

export const DrugSupport = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '上品聚魂丸 元气+200',
    value: CoreHelper.Food.DrugSupport.ShangPinJuHunWan,
  },
];

export const HomeFood = [
  {
    title: '不使用',
    value: '',
  },
  {
    title: '小炒青菜 攻击+149',
    value: CoreHelper.Food.HomeFood.XiaoChaoQingCai,
  },
  {
    title: '煎豆腐 破招+277',
    value: CoreHelper.Food.HomeFood.JianDouFu,
  },
  {
    title: '炖豆腐 无双+277',
    value: CoreHelper.Food.HomeFood.DunDouFu,
  },
  {
    title: '清蒸鲈鱼 破防+277',
    value: CoreHelper.Food.HomeFood.QingZhengLuYu,
  },
  {
    title: '炸小鱼 会心+277',
    value: CoreHelper.Food.HomeFood.ZhaXiaoYu,
  },
];

export const Target = [
  {
    title: '113级木桩',
    value: CoreHelper.Target.MuZhuang113,
  },
  {
    title: '112级木桩',
    value: CoreHelper.Target.MuZhuang112,
  },
  {
    title: '111级木桩',
    value: CoreHelper.Target.MuZhuang111,
  },
  {
    title: '达摩洞Boss',
    value: CoreHelper.Target.DaMoDong,
  },
];
