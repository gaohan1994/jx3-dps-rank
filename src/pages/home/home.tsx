import { useEffect, useState } from 'react';
import Rank from '../../component/rank';
import { GameProfessions } from '../../core/config';
import GameCore from '../../core/game';
import '../css/index.css';
import { EquipmentSelect } from './component/select';


function Home() {

  const [rankData, setRankData] = useState([] as GameCore[]);
  const [equipment, setEquipment] = useState(0);

  useEffect(() => {
    const data = [];

    for (var key in GameProfessions) {
      const currentProfession = GameProfessions[key];

      for (var classKey in currentProfession) {

        data.push({
          profession: key,
          class: classKey,
          dps: Math.random() * 10000 + new Date().getTime() / 100000000,
        });
      }
    }

    data.sort((a, b) => b.dps - a.dps);

    // console.log('data:', data);

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