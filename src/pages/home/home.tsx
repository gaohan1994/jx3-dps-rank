import { useEffect, useState } from 'react';
import Rank from '../../component/rank';
import GameCore from '../../core/game';
import '../css/index.css';
import { EquipmentSelect } from './component/select';

function Home() {

  const [rankData, setRankData] = useState([] as GameCore[]);
  const [equipment, setEquipment] = useState(0);

  useEffect(() => {
    const data = [
      {
        profession: 'ShaoLin',
        class: 'YiJinJing',
        dps: '13000'
      },
      {
        profession: 'ChunYang',
        class: 'ZiXiaGong',
        dps: '12000'
      },
      {
        profession: 'ChunYang',
        class: 'TaiXuJianYi',
        dps: '11000'
      },
      {
        profession: 'LingXueGe',
        class: 'YinLongJue',
        dps: '11000'
      }
    ];

    let topGameClass: GameCore;

    const rData = data.map((item: any, index: number) => {
      const gameCore = new GameCore({ profession: item.profession, class: item.class, dps: item.dps, topGameClass });
      if (index === 0) {
        topGameClass = gameCore;
      }
      return gameCore;
    });

    setRankData(rData);
  }, [])

  return (
    <div className='home'>
      <div className='home-tip'>
        dps排行榜会随着版本一起更新
      </div>

      {/* <EquipmentSelect callback={setEquipment} /> */}
      {rankData.map((rank, index) => {
        return <Rank rank={rank} index={index} key={`${rank.profession}-${rank.class}`} />
      })}
    </div>
  )
}

export default Home;