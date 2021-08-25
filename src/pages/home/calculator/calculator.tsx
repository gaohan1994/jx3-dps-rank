import Jx3DpsCore from "jx3-dps-core";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Card, Input, notification, Select, Tooltip, Switch, Modal } from 'antd'
import { CaretRightOutlined, InfoCircleOutlined } from '@ant-design/icons'
import './index.css';
import { Motion, spring, presets, TransitionMotion } from 'react-motion'
import numeral from 'numeral';
import DetailPage from "../detail/detail";
import { GameClassesNames, GameProfessionNames, getGameClass, UserAttributeKeys } from "../../../core/config";
import { useUserAttribute } from "../../../hooks/method";
import {
  skillIcons, Formations, SetBoenus, TeamSkills, GroupSkills, Weapons, EnChants, Spine, Banquet,
  FoodEnchance, FoodSupport, DrugEnhance, DrugSupport, Target
} from "./config";

const BoxWidthConfig = {
  min: 300,
  max: 700
}

const ModeConfig = {
  Normal: '木桩模式',
  Fight: '实战模式',
}

function CalculatorPage() {

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    document.title = '剑网三DPS计算器'
  }, []);

  /**
   * 设置人物属性
   */
  const [core, { setUserAttr }] = useUserAttribute(
    process.env.NODE_ENV === 'production'
      ? {
        JiChuGongJi: 0,
        WuQiShangHai: 2000,
        HuiXin: 0,
        HuiXiao: 0,
        PoFang: 0,
        PoZhao: 0,
        JiaSu: 0,
        WuShuang: 0,
        YuanQi: 0,
      }
      : {
        JiChuGongJi: 14816,
        WuQiShangHai: 1998,
        HuiXin: 23.58,
        HuiXiao: 176.98,
        PoFang: 39,
        PoZhao: 4117,
        JiaSu: 4,
        WuShuang: 43.62,
        YuanQi: 2623,
      }
  );

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

  const [result, setResult] = useState(undefined as any);

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
    } else if (mode === ModeConfig.Fight) {
      setFormation(Formations[4].value);
      setSetBoenus(SetBoenus[1].value);
      setTeamSkill(TeamSkills.map((item) => item.value));
      setGroupSkill(GroupSkills.map((item) => item.value));
      setWeapon(Weapons[1].value);
      setenchant(EnChants.map((item) => item.value));
      setSpine(true);
      setBanquet(Banquet.map((item) => item.value));
      setFoodEnchance(FoodEnchance[1].value);
      setFoodSupport(FoodSupport[1].value);
      setDrugEnhance(DrugEnhance[1].value);
      setDrugSupport(DrugSupport[1].value);
      setTarget(Target[3].value);
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
        coreValue[currentAttr.value] = numeral(core[currentAttr.value]).value() || 0;
      }

      const jx3Dps = new Jx3DpsCore.YiJinJing({
        core: {
          type: 'YuanQi',
          ...coreValue
        },
        support: {
          mode: "NeiGong",
          target: target
        }
      });

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
        supportLib = supportLib.concat(banquet);
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

      // console.log('supportLib', supportLib);

      for (let index = 0; index < supportLib.length; index++) {
        jx3Dps.use(supportLib[index]);
      }

      const result = await jx3Dps.total();

      jx3Dps.support.showGain();

      toogleBox(false);
      setLoading(true);

      setTimeout(() => {
        setResult(result);
        setLoading(false);
      }, 1000 * 1);
    } catch (error) {
      notification.error({
        message: error.message,
      });
    }

  };

  const gm = getGameClass(GameProfessionNames.ShaoLin, GameClassesNames.YiJinJing);

  return (
    <div className='calculator-home'>
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
                })}

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
          ? <DetailPage data={result} gameClass={gm} icons={skillIcons} />
          : <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className='calculator-loading'>
              <img src={gm.icon} />
              <span style={{ backgroundColor: `rgba(${gm.color.join(', ')})` }} />
            </div>
          </div>
      }

      <Bate />
    </div>
  );
}

function Bate() {

  return (
    <Tooltip
      title='测试版计算器 加速等属性的计算以及小吃、特效武器、更多技能的高级选项将逐步更新！在做了在做了！'
    >
      <div className='calculator-bate'>
        <span>作者：道灵</span>
        <span>有问题请加QQ: 871418277</span>
        <span>特别感谢秃不得、老萧</span>
        <span>Bate</span>
        <InfoCircleOutlined style={{ color: '#ffffff' }} />
      </div>
    </Tooltip>
  )
}

export default CalculatorPage;