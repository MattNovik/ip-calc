import { useEffect, useState } from "react"
import './index.scss';

const InfoPoint = (props) => {
  const {name,count,type} = props;
  //const [count, setCount] = useState(i); 
  //const [type, setType] = useState(k);

  return (
    <>
      <div className="info-element">
        <p className="info-element__name">
          {`${name}`}
        </p>
        <div className="info-element__wrapper-info">
          <span className="info-element__counts">{`${count}`} </span>
          <span className="info-element__type">{`${type}`}</span>
        </div>
      </div>
    </>
  )
}

export default InfoPoint