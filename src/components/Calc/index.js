import { useState } from "react";
import InfoPoint from "../InfoPont";
import FormCalc from "../FormCalc";
import './index.scss';

const Calc = () => {
  const [monthPay, setMonthPay] = useState("36 456");
  const [percent, setPercent] = useState(13);
  const [creditSumm, setCreditSumm] = useState("354 000 000");
  const [taxes, setTaxes] = useState("658 000");
  const [income, setIncome] = useState("49 000");
  const callFunc = (data) => {
    const newMonthPay = (((data.realEstateCost-data.downPayment)*(percent/12/100))/(1-(1+(percent/12/100)*(1-data.creditTerm))));
    const newCreditSumm = (data.realEstateCost-data.downPayment);
    const newIncome = (Number(newMonthPay)*1.8);
    setCreditSumm(newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setMonthPay(newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setIncome(newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

  }

  return (
    <>
      <div className="calc">
        <h1 className="calc__name">
          Ипотечный калькулятор
        </h1>
        <div className="calc__block">
          <div className="calc__info">
            <InfoPoint name="Ежемесячный платеж" count={monthPay} type="руб." />
            <InfoPoint name="Ставка по проценту"  count={percent} type="%" />
            <InfoPoint name="Сумма кредита"  count={creditSumm} type="руб." />
            <InfoPoint name="Налоговый вычет"  count={taxes} type="руб." />
            <InfoPoint name="Необходимый доход"  count={income} type="руб." />
          </div>
          <FormCalc onSubmitParent={callFunc}/>
        </div>
      </div>
    </>
  )
}

export default Calc