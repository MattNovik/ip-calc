import { useState } from "react";
import { useCookies } from 'react-cookie';
import InfoPoint from "../InfoPont";
import FormCalc from "../FormCalc";
import './index.scss';

const Calc = () => {
  const [monthPay, setMonthPay] = useState("36 456");
  const [percent, setPercent] = useState(13);
  const [creditSumm, setCreditSumm] = useState("354 000 000");
  const [taxes, setTaxes] = useState("658 000");
  const [income, setIncome] = useState("49 000");
  const [cookies, setCookie] = useCookies([]);

  const percentList = {
    "1": 13,
    "2": 15,
    "3": 14.5,
    "4": 12,
    "5": 11,
    "6": 16,
    "7": 10,
  };

  function handleCookie(data) {
    for (let key in data) {
      setCookie(key, data[key]);
    }
  }

  const callFunc = (data) => {
    let newPercent = percentList[data.goal];
    let newMonthPay = (((data.realEstateCost-data.downPayment)*(percent/12/100))/(1-(1+(percent/12/100)*(1-data.creditTerm))));
    let newCreditSumm = (data.realEstateCost-data.downPayment);
    let newIncome = (Number(newMonthPay)*1.8);
    setCreditSumm(newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setMonthPay(newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setIncome(newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setPercent(newPercent);
    handleCookie(data);
    console.log(document.cookie);
  }

  return (
    <>
      <div className="calc">
        <h1 className="calc__name">
          Ипотечный калькулятор
        </h1>
        <div className="calc__block">
          <div className="calc__info">
            <InfoPoint name="Ежемесячный платеж" defValue={cookies.goal} count={monthPay} type="руб." />
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