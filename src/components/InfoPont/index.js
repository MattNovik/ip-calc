import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const InfoPoint = (props) => {
  const {name,count,type, circleInfo, hintText} = props;

  return (
    <>
      <div className='info-element'>
        <div className='info-element__wrapper-name'>
          <span className='info-element__name'>
            {name}
          </span>
          {circleInfo && (
            <>
              <FontAwesomeIcon icon={faCircleInfo} tabIndex='1'/>
              <div className='info-element__hint'>
                {hintText}
              </div>
            </>
          )}
        </div>
        <div className='info-element__wrapper-info'>
          <span className='info-element__counts'>{count} </span>
          <span className='info-element__type'>{type}</span>
        </div>
      </div>
    </>
  )
}

export default InfoPoint