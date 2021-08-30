import numeral from "numeral";
import './rank.css';

type Props = {
  index: any;
  icon: string;
  name: string;
  value: string;
  percent?: number | string;
  subName?: string;
  color?: string;
}
/**
 * Rank 组件
 *
 * @param {Props} props
 * @return {*} 
 */
function BaseDpsItem(props: Props) {
  const { index, icon, name, subName, value, percent, color } = props;

  const showValue = numeral(value).format('0,000');

  return (
    <div className='rank'>
      <div className='rank-core'>
        <div className='rank-detail'>
          <b className='rank-index'>
            {index}
          </b>
          <i className='rank-icon' style={{ backgroundImage: `url(${icon})` }} />

          <div className='rank-name'>
            <span>{name}</span>
            {subName && (
              <span>{`-`}{subName}</span>
            )}
          </div>
        </div>
        <div className='rank-detail'>
          <span>
            {`${showValue}`}
          </span>
          {percent && (
            <div className='rank-box'>
              <span className='rank-pa'>
                {`${percent} %`}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='rank-dps' style={{ marginTop: 4, backgroundColor: `rgb(${color ? color : '#fff'})`, width: `${percent || 100}%` }} />
    </div>
  )
}

export default BaseDpsItem;