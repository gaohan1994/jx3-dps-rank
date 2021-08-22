import Jx3DpsCore from "jx3-dps-core";
import { useState } from "react";
import { Button, Card, Input, notification, Select, Tag } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import './index.css';
import { Motion, spring, presets } from 'react-motion'
import numeral from 'numeral';
import DetailPage from "../detail/detail";
import { GameClassesNames, GameProfessionNames, getGameClass, UserAttributeKeys } from "../../../core/config";
import { useUserAttribute } from "../../../hooks/method";
import { skillIcons, formations, SetBoenus, TeamSkills, GroupSkills } from "./config";

const BoxWidthConfig = {
  min: 300,
  max: 700
}

function CalculatorPage() {

  const [loading, setLoading] = useState(false);

  /**
   * 设置人物属性
   */
  const [core, { setUserAttr }] = useUserAttribute(
    {
      JiChuGongJi: 13000,
      WuQiShangHai: 1998,
      HuiXin: 19,
      HuiXiao: 190,
      PoFang: 40,
      PoZhao: 4117,
      JiaSu: 4,
      WuShuang: 41,
      YuanQi: 3250,
    }
  );

  const [formation, setFormation] = useState(formations[1].value);
  const [setBoenus, setSetBoenus] = useState(SetBoenus[1].value);
  const [teamSkill, setTeamSkill] = useState(TeamSkills.map((item) => item.value));
  const [groupSkill, setGroupSkill] = useState(GroupSkills.map((item) => item.value));



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
        coreValue[currentAttr.value] = numeral(core[currentAttr.value]).value();
      }

      const jx3Dps = new Jx3DpsCore.YiJinJing({
        core: {
          type: 'YuanQi',
          ...coreValue
        },
        support: {
          mode: "NeiGong"
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

      for (let index = 0; index < supportLib.length; index++) {
        jx3Dps.use(supportLib[index]);
      }

      const result = await jx3Dps.total();

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

              {interpolatedStyle.motionWidth === BoxWidthConfig.max && (
                <div className='calculator-more-box'>
                  <div className='calculator-title'>
                    高级选项
                  </div>

                  <div className='calculator-item'>
                    <div className='calculator-item-title'>阵法</div>
                    <Select value={formation} onChange={(event) => setFormation(event)} style={{ width: '100%' }}>
                      {formations.map((item) => {
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
              )}

              <div className='calculator-options-button' onClick={() => toogleBox()}>
                <CaretRightOutlined style={{ transform: `rotate(${interpolatedStyle.motionTranslateY}deg)` }} />
                高级选项
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
          : <div className='calculator-loading'>
            <img src={gm.icon} />
            <span style={{ backgroundColor: `rgba(${gm.color.join(', ')})` }} />
          </div>
      }
    </div>
  );
}

export default CalculatorPage;