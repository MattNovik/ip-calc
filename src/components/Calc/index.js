import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import InfoPoint from "../InfoPont";
import FormCalc from "../FormCalc";
import './index.scss';
import PaymentShedule from "../PaymentShedule";

const Calc = () => {
  const [monthPay, setMonthPay] = useState("689 655.17" );
  const [percent, setPercent] = useState(13);
  const [creditSumm, setCreditSumm] = useState("20 000 000.00");
  const [taxes, setTaxes] = useState("658 000");
  const [income, setIncome] = useState("1 241 379.31");
  const [cookies, setCookie] = useCookies([]);

  const mainData = {};

  const sheduleDataFunc = (data) => {
    let shedulePercent = percentList[data.goal];
    let sheduleCreditSumm = (data.realEstateCost-data.downPayment);
    //let sheduleMonthPay = (((data.realEstateCost-data.downPayment)*(shedulePercent/12/100))/(1-(1+(shedulePercent/12/100)*(1-data.creditTerm))));
    let sheduleCreditTerm = data.creditTerm;
    let commonPerc = Math.pow((1 + shedulePercent/12/100), sheduleCreditTerm);
    let sheduleMonthPay;
    sheduleMonthPay = (sheduleCreditSumm*shedulePercent/12/100*commonPerc)/(commonPerc - 1);
    let finalMass = [];
    let month = 1;
    let i = sheduleCreditTerm;
    let percentLeftSum = sheduleCreditSumm * shedulePercent/12/100;
    let mainPerc = sheduleMonthPay;
    while (i > 0) {
      percentLeftSum = sheduleCreditSumm * shedulePercent/12/100;
      mainPerc = mainPerc - percentLeftSum;
      sheduleCreditSumm = sheduleCreditSumm - mainPerc;
      let nextElem = {};
      i--;
      month = month + 1;
      let nameMonth = `${'month' + month}`;
      nextElem[month] = mainPerc;
      finalMass.push(nextElem);
    }
    return finalMass;
  }

  const percentList = {
    "1": 13,
    "2": 15,
    "3": 14.5,
    "4": 12,
    "5": 11,
    "6": 16,
    "7": 10,
  };

  const getCookie = key =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
      const item = currentCookie.split("=");
      const storedKey = item[0];
      const storedValue = item[1];
      return key === storedKey 
        ? decodeURIComponent(storedValue) 
        : total;
    },
  '');

  useEffect((cookies) => {
    if (getCookie("newMonthPay") !== '') {
      setMonthPay(getCookie("newMonthPay"));
    }
    if (getCookie("newPercent") !== '') {
      setPercent(getCookie("newPercent"));
    }
    if (getCookie("newCreditSumm") !== '') {
      setCreditSumm(getCookie("newCreditSumm"));
    }
    if (getCookie("newIncome") !== '') {
      setIncome(getCookie("newIncome"));
    } 
  }, []);


  function handleCookie(data) { 
    for (let key in data) {
      setCookie(key, data[key]);
    }
  }

  const callFunc = (data) => {
    let newPercent = percentList[data.goal];
    setCookie("newPercent",newPercent);
    let newMonthPay = (((data.realEstateCost-data.downPayment)*(percent/12/100))/(1-(1+(percent/12/100)*(1-data.creditTerm))));
    setCookie("newMonthPay", newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    let newCreditSumm = (data.realEstateCost-data.downPayment);
    setCookie("newCreditSumm",newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    let newIncome = (Number(newMonthPay)*1.8);
    setCookie("newIncome",newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setCreditSumm(newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setMonthPay(newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setIncome(newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    setPercent(newPercent);
    handleCookie(data);
    Object.assign(mainData, data);
    console.log(sheduleDataFunc(data));
  }

  return (
    <>
      <div className="calc">
        <h1 className="calc__name">
          Ипотечный калькулятор
        </h1>
        <div className="calc__block">
          <div className="calc__info">
            <InfoPoint name="Ежемесячный платеж" count={monthPay} type="руб."/>
            <InfoPoint name="Ставка по кредиту"  count={percent} type="%" />
            <InfoPoint name="Сумма кредита"  count={creditSumm} type="руб." />
            <InfoPoint name="Налоговый вычет"  count={taxes} type="руб." circleInfo="true" hintText="Some info more info about this point" />
            <InfoPoint name="Необходимый доход"  count={income} type="руб." />
          </div>
          <FormCalc onSubmitParent={callFunc}/>
        </div>
      </div>
      <PaymentShedule />
    </>
  )
}

export default Calc