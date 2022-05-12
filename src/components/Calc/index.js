import { useState } from "react";
import InfoPoint from "../InfoPont";
import FormCalc from "../FormCalc";

const Calc = () => {
  const [appInf, setAppInf] = useState();
  const callFunc = (data) => {
    const newValue = data.firstName;
    setAppInf(newValue);
  }

  return (
    <>
      <div className="calc">
        <h1 className="calc__name">
          Ипотечный калькулятор
        </h1>
        <div className="calc__block">
          <div className="calc__info">
            <InfoPoint name="Ежемесячный платеж" i="283567" k="руб." />
            {/* <InfoPoint name="Ставка по проценту" i="13" k="%" />
            <InfoPoint name="Сумма кредита" i="354000000" k="руб." />
            <InfoPoint name="Налоговый вычет" i="658000" k="руб." />
            <InfoPoint name="Необходимый доход" i="49000" k="руб." /> */}
          </div>
          <FormCalc onSubmitParent={callFunc}/>
          <div>{appInf}</div>
        </div>
      </div>
    </>
  )
}

export default Calc