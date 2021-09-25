import Jx3DpsCore, { CoreHelper, YiJinJing } from "jx3-dps-core";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Card, Input, notification, Select, Tooltip, Switch, Modal, Slider } from 'antd'
import { CaretRightOutlined, InfoCircleOutlined } from '@ant-design/icons'
import './index.css';
import { Motion, spring, presets, TransitionMotion } from 'react-motion'
import numeral from 'numeral';
import DetailPage from "../detail/detail";
import { GameClassesNames, GameProfessionNames, getGameClass, UserAttributeKeys } from "../../../core/config";
import { useUserAttribute } from "../../../hooks/method";
import {
  skillIcons, Formations, SetBoenus, TeamSkills, GroupSkills, Weapons, EnChants, Spine, Banquet,
  FoodEnchance, FoodSupport, DrugEnhance, DrugSupport, Target, HomeFood
} from "./config";
import CalculatorTitle from "./title";
import cache from "../../../core/cache";
import { YiJinJingValues } from "jx3-dps-core/build/types";
import smar from 'smar-util';

const BoxWidthConfig = {
  min: 300,
  max: 700
}

const ModeConfig = {
  Normal: '普通模式',
  Fight: '实战模式',
  Max: '最大值模式',
}

function CalculatorPage() {

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    document.title = '剑网三 少林 易筋经 计算器'
  }, []);

  /**
   * 设置人物属性
   */
  const [core, { setUserAttr, replaceUserAttr }] = useUserAttribute(
    process.env.NODE_ENV === 'production'
      ? {
        JiChuGongJi: 0,
        WuQiShangHai: 2000,
        HuiXin: 0,
        HuiXiao: 0,
        PoFang: 0,
        PoZhao: 0,
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
        WuShuang: 0,
        YuanQi: 0,
      }
      : {
        JiChuGongJi: 14399,
        WuQiShangHai: 1998,
        HuiXin: 18.69,
        HuiXiao: 175.77,
        PoFang: 40.44,
        PoZhao: 5298,
        WuShuang: 47.49,
        YuanQi: 2904,
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
      }
  );
  // Jx3DpsCore 实例
  const [controller, setController] = useState({} as YiJinJing);
  const [mode, setMode] = useState(ModeConfig.Normal);
  const [formation, setFormation] = useState(Formations[0].value);
  const [setBoenus, setSetBoenus] = useState(SetBoenus[1].value);
  const [teamSkill, setTeamSkill] = useState([] as any[]);
  const [groupSkill, setGroupSkill] = useState([] as any[]);
  const [weapon, setWeapon] = useState(Weapons[0].value);
  const [enchant, setenchant] = useState(EnChants.map((item) => item.value));
  const [spine, setSpine] = useState(true);
  const [banquet, setBanquet] = useState([] as any[]);
  const [foodEnchance, setFoodEnchance] = useState('');
  const [foodSupport, setFoodSupport] = useState('');
  const [drugEnhance, setDrugEnhance] = useState('');
  const [drugSupport, setDrugSupport] = useState('');
  const [target, setTarget] = useState(Target[0].value);
  const [cwTimes, setCWTimes] = useState(3);
  const [homefood, setHomefood] = useState('');

  /**
   * 弘法相关
   */
  const [hongFa, setHongFa] = useState(false);
  const [hongFaPercent, setHongFaPercent] = useState(40);

  /**
   * 梅花盾相关
   */
  const [meiHuaDun, setMeiHuaDun] = useState(false);
  const [meiHuaDunPercent, setMeiHuaDunPercent] = useState(80);

  /**
   * 盒子宽度
   * 
   * @param boxWidth
   */
  const [boxWidth, setBoxWidth] = useState(BoxWidthConfig.min);
  /**
   * icon 旋转角度
   * @param translateY
   */
  const [translateY, setTranslateY] = useState(0);

  /**
   * 计算结果
   */
  const [result, setResult] = useState(undefined as any);

  /**
   * 如果是讲武堂成员则不用一直输入
   */
  const [versionToken, setVersionToken] = useState(false);
  /**
   * 讲武堂姓名
   */
  const [userName, setUserName] = useState('');
  const [versionVisible, setVersionVisible] = useState(false);
  /**
   * 计算器版本
   */
  const [version, setCalculatorVersion] = useState(Jx3DpsCore.YiJinJing.YiJinJingVersion.Normal as YiJinJingValues);

  /**
   * 每次切换版本则重置计算结果
   */
  const setVersion = (value: YiJinJingValues) => {
    setCalculatorVersion(value);
    setResult(undefined);
  }

  /**
   * @todo 切换模式
   * 
   * 1、切换成正式版不用校验
   * 2、切换成讲武堂 校验名字
   * 3、成功可以切换
   */
  const changeCalculatorVersion = async () => {
    // 如果是从讲武堂模式切换到正式模式 则直接切换
    if (version === Jx3DpsCore.YiJinJing.YiJinJingVersion.Immortal) {
      setVersion(Jx3DpsCore.YiJinJing.YiJinJingVersion.Normal);
      return;
    }

    // 如果是从正式版切换到讲武堂
    if (versionToken === true) {
      // 之前已经输入过讲武堂姓名校验成功
      setVersion(Jx3DpsCore.YiJinJing.YiJinJingVersion.Immortal);
      return;
    }

    // 显示输入框
    setVersionVisible(true);
  }

  const onVersionInputFinish = async () => {
    if (!userName) {
      return;
    }

    const url = process.env.NODE_ENV === 'development'
      ? 'http://101.132.24.127:9090/api/checkimmortal'
      : '/api/checkimmortal';

    const result = await fetch(`${url}/${userName}`, { method: 'get' }).then(res => res.json());
    if (result.data === true) {
      setVersion(Jx3DpsCore.YiJinJing.YiJinJingVersion.Immortal);
      // 校验成功吧token设置为true
      setVersionToken(true);
      notification.success({ message: '切换成讲武堂版本！' })
    } else {
      notification.error({ message: '切换失败，请联系道灵或秃酱添加进讲武堂名单' });
    }
    setVersionVisible(false);
  }

  /**
   * 切换盒子宽度
   * @method toogleBox
   */
  const toogleBox = (value?: boolean) => {
    let targetWidth = 0;
    let targetTranslateY = 0;

    if (boxWidth === BoxWidthConfig.min) {
      targetWidth = BoxWidthConfig.max;
      targetTranslateY = 180;
    } else {
      targetWidth = BoxWidthConfig.min;
      targetTranslateY = 0;
    }

    if (value === true) {
      targetWidth = BoxWidthConfig.max;
      targetTranslateY = 180;
    }

    if (value === false) {
      targetWidth = BoxWidthConfig.min;
      targetTranslateY = 0;
    }

    setBoxWidth(targetWidth);
    setTranslateY(targetTranslateY);
  }

  useEffect(() => {
    if (mode === ModeConfig.Normal) {
      setFormation('');
      setSetBoenus(SetBoenus[1].value);
      setTeamSkill([]);
      setGroupSkill([]);
      setWeapon(Weapons[0].value);
      setenchant(EnChants.map((item) => item.value));
      setSpine(true);
      setBanquet([]);
      setFoodEnchance('');
      setFoodSupport('');
      setDrugEnhance('');
      setDrugSupport('');
      setTarget(Target[0].value);

      setHongFa(false);
      setMeiHuaDun(false);
    } else if (mode === ModeConfig.Fight) {
      setFormation(Formations[4].value);
      setSetBoenus(SetBoenus[1].value);
      setTeamSkill(TeamSkills.map((item) => item.value));
      setGroupSkill([GroupSkills[0].value, GroupSkills[1].value, GroupSkills[2].value,]);
      setWeapon(Weapons[2].value);
      setenchant(EnChants.map((item) => item.value));
      setSpine(true);
      setBanquet(Banquet.map((item) => item.value));
      setFoodEnchance(FoodEnchance[1].value);
      setFoodSupport(FoodSupport[1].value);
      setDrugEnhance(DrugEnhance[1].value);
      setDrugSupport(DrugSupport[1].value);
      setTarget(Target[3].value);

      setHongFa(false);
      setMeiHuaDun(false);
    } else if (mode === ModeConfig.Max) {
      setUserAttr({ target: 'JiaSu', value: CoreHelper.JiaSuList.ErDuanJiaSu });
      setFormation(Formations[4].value);
      setSetBoenus(SetBoenus[1].value);
      setTeamSkill(TeamSkills.map((item) => item.value));
      setGroupSkill(GroupSkills.map((item) => item.value));
      setWeapon(CoreHelper.Weapons.CW);
      setenchant(EnChants.map((item) => item.value));
      setSpine(true);
      setBanquet(Banquet.map((item) => item.value).filter(a => !!a));
      setFoodEnchance(FoodEnchance[1].value);
      setFoodSupport(FoodSupport[1].value);
      setDrugEnhance(DrugEnhance[1].value);
      setDrugSupport(DrugSupport[1].value);
      setTarget(Target[3].value);
      setHomefood(HomeFood[1].value)

      setHongFa(true);
      setMeiHuaDun(true);
    }
  }, [mode]);

  /**
   * 切换模式
   */
  const onChangeMode = (value: any) => {
    Modal.confirm({
      title: '切换模式',
      content: '切换模式会修改您已经选择的选项，请问确定修改模式吗',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setMode(value);
      }
    });
  }

  /**
   * 导入人物历史记录
   */
  const onImport = () => {
    const token = cache.hasLastCore();
    if (!token) {
      notification.error({
        message: '导入失败',
        description: '没有历史记录'
      });
      return;
    }

    const core = cache.getLastCore();
    replaceUserAttr(core);
  }

  /**
   * 清空人物数据
   *
   */
  const onReset = () => {
    Modal.confirm({
      title: '清空角色属性',
      content: '确定清空角色属性吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        replaceUserAttr({
          JiChuGongJi: 0,
          WuQiShangHai: 2000,
          HuiXin: 0,
          HuiXiao: 0,
          PoFang: 0,
          PoZhao: 0,
          JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
          WuShuang: 0,
          YuanQi: 0,
        })
      }
    });
  }

  /**
   * 计算dps
   *
   */
  const onCalculator = async () => {
    try {
      let coreValue = core;

      for (let i = 0; i < UserAttributeKeys.length; i++) {
        const currentAttr = UserAttributeKeys[i];
        /**
         * 首先判断是否非空
         */
        if (currentAttr.nullToken !== true) {
          if (!core[currentAttr.value]) {
            throw new Error(`请输入${currentAttr.title}`);
          }
        }
        /**
         * 属性转化成number
         */
        if (currentAttr.title !== '加速') {
          coreValue[currentAttr.value] = numeral(core[currentAttr.value]).value();
        }
        coreValue[currentAttr.value] = core[currentAttr.value];
      }

      const jx3Dps = new Jx3DpsCore.YiJinJing({
        CalculatorVersion: version,
        core: {
          type: 'YuanQi',
          ...coreValue
        },
        support: {
          mode: "NeiGong",
          target: target,
          CWTimes: cwTimes,
        }
      });

      cache.saveCoreAttributes(coreValue);

      /**
       * 增益库
       * @param supportLib
       */
      let supportLib = [];

      if (formation !== '') {
        supportLib.push(formation);
      }
      if (setBoenus !== '') {
        supportLib = supportLib.concat(setBoenus.split(','));
      }
      if (teamSkill.length > 0) {
        supportLib = supportLib.concat(teamSkill);
      }
      if (groupSkill.length > 0) {
        supportLib = supportLib.concat(groupSkill);
      }

      supportLib.push(weapon);

      if (enchant.length > 0) {
        supportLib = supportLib.concat(enchant);
      }

      if (spine === true) {
        supportLib.push(Spine[0].value);
      }

      if (banquet.length > 0) {
        supportLib = supportLib.concat(banquet.filter(b => !!b));
      }

      if (foodEnchance !== '') {
        supportLib.push(foodEnchance);
      }
      if (foodSupport !== '') {
        supportLib.push(foodSupport);
      }
      if (drugEnhance !== '') {
        supportLib.push(drugEnhance);
      }
      if (drugSupport !== '') {
        supportLib.push(drugSupport);
      }
      if (homefood !== '') {
        supportLib.push(homefood);
      }

      if (hongFa === true) {
        jx3Dps.use(CoreHelper.GroupSkills.HongFa, { coverage: hongFaPercent / 100 })
      }

      if (meiHuaDun === true) {
        jx3Dps.use(CoreHelper.GroupSkills.MeiHuaDun, { coverage: meiHuaDunPercent / 100 });
      }

      for (let index = 0; index < supportLib.length; index++) {
        jx3Dps.use(supportLib[index], {});
      }

      const result = await jx3Dps.total();

      // 设置实例
      setController(jx3Dps);

      setLoading(true);

      setTimeout(() => {
        setResult(result);
        setLoading(false);
      }, 1000 * 1);
    } catch (error: any) {
      notification.error({
        message: error.message,
      });
    }

  };

  const gm = getGameClass(GameProfessionNames.ShaoLin, GameClassesNames.YiJinJing);

  return (
    <div className='calculator-home'>
      <CalculatorTitle version={version} changeCalculatorVersion={changeCalculatorVersion} />
      <Motion style={{ motionWidth: spring(boxWidth, presets.gentle), motionTranslateY: spring(translateY) }}>
        {interpolatedStyle => {
          return (
            <Card style={{ width: interpolatedStyle.motionWidth, overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: 260 }}>
                <div className='calculator-title'>
                  角色属性
                </div>

                {UserAttributeKeys.map((attr) => {
                  const { value, title, ...rest } = attr;
                  if (title !== '加速') {
                    return (
                      <div key={value} className='calculator-item'>
                        <div className='calculator-item-title'>{title}</div>
                        <Input
                          {...rest}
                          value={core[value]}
                          onChange={(event) => {
                            setUserAttr({ target: value, value: event.target.value })
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={value} className='calculator-item'>
                      <div className='calculator-item-title'>{title}</div>
                      <Select value={core[value]} onChange={(event) => setUserAttr({ target: value, value: event })} style={{ width: '100%' }}>
                        <Select.Option value={CoreHelper.JiaSuList.YiDuanJiaSu}>
                          一段加速
                        </Select.Option>
                        <Select.Option value={CoreHelper.JiaSuList.ErDuanJiaSu}>
                          二段加速
                        </Select.Option>
                      </Select>
                    </div>
                  )
                })}
                <div className='calculator-bar'>
                  <Button type='primary' onClick={onImport}>导入角色属性</Button>
                  <Button onClick={onReset}>清空角色属性</Button>
                </div>

                <div className='calculator-tips'>
                  如果您输入的角色属性是已经吃过小吃、桌子等增益之后的面板了，请勿在高级选项中再次勾选，否则计算出来的结果会高很多
                </div>

              </div>

              <TransitionMotion
                styles={interpolatedStyle.motionWidth > BoxWidthConfig.min + 50
                  ? [{
                    key: 'test',
                    style: { scale: spring(1) }
                  }]
                  : [{
                    key: 'test',
                    style: { scale: spring(0) }
                  }]}
              >
                {inStyles => {
                  return inStyles[0] ? (
                    <div
                      className='calculator-more-box'
                      style={{ transform: `scale(${inStyles[0].style.scale}, ${inStyles[0].style.scale})` }}
                    >

                      <div className='calculator-title'>
                        高级选项
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>目标选择</div>
                        <Select value={target} onChange={(event) => setTarget(event)} style={{ width: '100%' }}>
                          {Target.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>阵法</div>
                        <Select value={formation} onChange={(event) => setFormation(event)} style={{ width: '100%' }}>
                          {Formations.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>武器</div>
                        <Select
                          value={weapon}
                          onChange={(value) => setWeapon(value)}
                          style={{ width: '100%' }}>
                          {Weapons.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      {weapon === CoreHelper.Weapons.CW && (
                        <div className='calculator-item'>
                          <div className='calculator-item-title'>橙武次数</div>
                          <Slider
                            style={{ width: '100%' }}
                            min={1}
                            max={6}
                            value={cwTimes}
                            onChange={value => setCWTimes(value)}
                          />
                        </div>
                      )}

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>套装</div>
                        <Select
                          value={setBoenus}
                          onChange={(value) => setSetBoenus(value)}
                          style={{ width: '100%' }}>
                          {SetBoenus.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item' style={{ justifyContent: 'space-between' }}>
                        <div className='calculator-item-title'>特效腰椎</div>
                        <Switch
                          checked={spine}
                          onChange={(value) => setSpine(value)}
                        />
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>附魔</div>
                        <Select
                          value={enchant}
                          mode='multiple'
                          onChange={(value) => setenchant(value)}
                          style={{ width: '100%' }}>
                          {EnChants.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>宴席桌子</div>
                        <Select
                          value={banquet}
                          mode='multiple'
                          onChange={(value) => setBanquet(value)}
                          style={{ width: '100%' }}>
                          {Banquet.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>家园小吃</div>
                        <Select
                          value={homefood}
                          onChange={(value) => setHomefood(value)}
                          style={{ width: '100%' }}>
                          {HomeFood.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>增强食品</div>
                        <Select
                          value={foodEnchance}
                          onChange={(value) => setFoodEnchance(value)}
                          style={{ width: '100%' }}>
                          {FoodEnchance.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>辅助食品</div>
                        <Select
                          value={foodSupport}
                          onChange={(value) => setFoodSupport(value)}
                          style={{ width: '100%' }}>
                          {FoodSupport.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>
                      <div className='calculator-item'>
                        <div className='calculator-item-title'>增强药品</div>
                        <Select
                          value={drugEnhance}
                          onChange={(value) => setDrugEnhance(value)}
                          style={{ width: '100%' }}>
                          {DrugEnhance.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>
                      <div className='calculator-item'>
                        <div className='calculator-item-title'>辅助药品</div>
                        <Select
                          value={drugSupport}
                          onChange={(value) => setDrugSupport(value)}
                          style={{ width: '100%' }}>
                          {DrugSupport.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>技能增益</div>
                        <Select
                          value={teamSkill}
                          mode='multiple'
                          onChange={(value) => setTeamSkill(value)}
                          style={{ width: '100%' }}>
                          {TeamSkills.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item'>
                        <div className='calculator-item-title'>团队辅助</div>
                        <Select
                          value={groupSkill}
                          mode='multiple'
                          onChange={(value) => setGroupSkill(value)}
                          style={{ width: '100%' }}>
                          {GroupSkills.map((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.title}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </div>

                      <div className='calculator-item' style={{ justifyContent: 'space-between' }}>
                        <div className='calculator-item-title'>舍身弘法</div>
                        <Switch
                          checked={hongFa}
                          onChange={(value) => setHongFa(value)}
                        />
                      </div>

                      {hongFa && (
                        <div className='calculator-item'>
                          <div className='calculator-item-title'>覆盖率%</div>
                          <Slider
                            style={{ width: '100%' }}
                            min={1}
                            max={100}
                            value={hongFaPercent}
                            onChange={value => setHongFaPercent(value)}
                          />
                        </div>
                      )}

                      <div className='calculator-item' style={{ justifyContent: 'space-between' }}>
                        <div className='calculator-item-title'>梅花盾</div>
                        <Switch
                          checked={meiHuaDun}
                          onChange={(value) => setMeiHuaDun(value)}
                        />
                      </div>
                      {meiHuaDun && (
                        <div className='calculator-item'>
                          <div className='calculator-item-title'>覆盖率%</div>
                          <Slider
                            style={{ width: '100%' }}
                            min={1}
                            max={100}
                            value={meiHuaDunPercent}
                            onChange={value => setMeiHuaDunPercent(value)}
                          />
                        </div>
                      )}


                    </div>
                  ) : <div />
                }}
              </TransitionMotion>

              <div className='calculator-options-button' >
                <div onClick={() => toogleBox()}>
                  <CaretRightOutlined style={{ transform: `rotate(${interpolatedStyle.motionTranslateY}deg)` }} />
                  高级选项
                </div>

                <Select
                  value={mode}
                  onChange={(value) => onChangeMode(value)}
                  style={{ marginLeft: 20 }}
                >
                  <Select.Option value={ModeConfig.Max}>
                    {ModeConfig.Max}
                  </Select.Option>
                  <Select.Option value={ModeConfig.Fight}>
                    {ModeConfig.Fight}
                  </Select.Option>
                  <Select.Option value={ModeConfig.Normal}>
                    {ModeConfig.Normal}
                  </Select.Option>
                </Select>
              </div>

              <div className='calculator-button'>
                <Button
                  style={{ width: 60, height: 60 }}
                  type='primary'
                  shape='circle'
                  danger={true}
                  onClick={onCalculator}
                >
                  计算
                </Button>
              </div>
            </Card>
          );
        }}
      </Motion>

      {
        result !== undefined && !!result.dps
          ? <DetailPage data={result} gameClass={gm} icons={skillIcons} controller={controller} version={version} />
          : <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className='calculator-loading'>
              <img src={gm.icon} />
              <span style={{ backgroundColor: `rgba(${gm.color.join(', ')})` }} />
            </div>
          </div>
      }
      <Bate />

      <Modal title='讲武堂法号' visible={versionVisible} okText='确定' cancelText='取消' centered={true} onOk={onVersionInputFinish} onCancel={() => setVersionVisible(false)}>

        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='找道灵或者秃酱添加进讲武堂名单（无门槛）'
        />
      </Modal>
    </div>
  );
}

function Bate() {

  return (
    <Tooltip
      title='测试版计算器 后续开放历史记录等功能 特别感谢秃不得、老萧'
    >
      <div className='calculator-bate'>
        <span>道灵、秃酱</span>
        <span>QQ: 871418277</span>
        <InfoCircleOutlined style={{ color: '#ffffff' }} />
      </div>
    </Tooltip>
  )
}

export default CalculatorPage;