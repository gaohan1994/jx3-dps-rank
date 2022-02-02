
## 剑网三 少林 易筋经 dps 计算器

本来打算写全职业计算器

后来发现步子迈的太大，扯到蛋了

别的门派不好瞎掺和都有自己的“学术圈”

还是管好自己门派的一亩三分地

如果需要合作、有问题请联系我的QQ:871418277

计算不准可以提issue给 [Jx3-dps-core](https://github.com/gaohan1994/jx3-dps-core)

## 核心组件 

[Jx3-dps-core](https://github.com/gaohan1994/jx3-dps-core)

## document

### 旧版本 jx3-dps-core 适配器

```javascript
/**
 * 旧版本 Jx3-dps-core 适配器
 * 如果是v3之前的jdc则删除掉cache防止出现白屏
 * @component JDCAdapter
 */
<JDCAdapter />
```

### JDCDropdown

```javascript
/**
 * @interface JDCDropdownProps
 *
 * @param JDCDataName 使用jx3-dps-core增益的名字
 * @param multiple 是否多选
 * @param useDescription 是否显示增益详情
 */
type JDCDropdownProps = {
  JDCDataName: string;
  multiple?: boolean;
  useDescription?: boolean;
};

<JDCDropdown
    JDCDataName={Jx3DpsCore.GainGroupTypes.Formations}
    useDescription={false}
/>
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.Weapons} useDescription={false} />
<JDCDropdown
    JDCDataName={Jx3DpsCore.GainGroupTypes.SetBonusesGain}
    multiple={true}
    useDescription={false}
/>
<JDCSwitch JDCDataName={Jx3DpsCore.GainGroupTypes.EffectSpines} />
<JDCDropdown
    JDCDataName={Jx3DpsCore.GainGroupTypes.Enchants}
    multiple={true}
    useDescription={false}
/>
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.WeaponEnchant} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.Banquet} multiple={true} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.HomeFood} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FoodEnhance} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FoodSupport} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.DrugEnhance} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.DrugSupport} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.HomeDrink} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FestivalFood} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.TeamSkills} multiple={true} />
<JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.GroupSkills} multiple={true} />
```
