import { useEffect, useState } from "react"

const InfoPoint = (props) => {
  const {name,i,k} = props;
  const [count, setCount] = useState(i); 
  const [type, setType] = useState(k);
  return (
    <>
      <div className="info__element">
        <p className="info__name">
          {`${name}`}
        </p>
        <div className="info__wrapper-info">
          <span className="info__counts">{`${count}`} </span>
          <span className="info__type">{`${type}`}</span>
        </div>
      </div>
    </>
  )
}

export default InfoPoint