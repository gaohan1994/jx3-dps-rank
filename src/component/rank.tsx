import numeral from 'numeral';
import GameCore from '../core/game';
import './rank.css';

type Props = {
  rank: GameCore;
  index: number;
}

/**
 * Rank 组件
 *
 * @param {Props} props
 * @return {*} 
 */
function Rank(props: Props) {
  const { rank, index } = props;

  console.log(rank.getPercent());
  return <div className='rank'>
    <div className='rank-core'>
      <div className='rank-detail'>
        <b className='rank-index'>
          {index + 1}
        </b>
        <i className='rank-icon' style={{ backgroundImage: `url(${rank.getIcon()})` }} />

        <div className='rank-name'>
          <span>{rank.getProfessionName()}{`-`}</span>
          <span>{rank.getClassName()}</span>
        </div>
      </div>
      <div className='rank-detail'>
        <span>
          {`${numeral(rank.getDps()).format('0,000')} DPS`}
        </span>
        <div className='rank-box'>
          <span className='rank-pa'>
            {`${rank.getPercent()} %`}
          </span>
        </div>

      </div>
    </div>

    <div className='rank-dps' style={{ backgroundColor: `rgb(${rank.getColor().join(', ')})`, width: `${rank.getPercent()}%` }} />
  </div>
}

export default Rank;