import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import InfoPoint from "../InfoPont";
import FormCalc from "../FormCalc";
import './index.scss';
import PaymentShedule from "../PaymentShedule";
import TablePayment from "../TablePayment";
import ButtonComp from "../ButtonComp";

const getCookie = key =>
document.cookie.split("; ").reduce((total, currentCookie) => {
  const item = currentCookie.split("=");
  const storedKey = item[0];
  const storedValue = item[1];
  return key === storedKey 
    ? decodeURIComponent(storedValue) 
    : total;
},'');

const MONTHMASS = [
  'янв.', 'фев.', 'мар.',
  'апр.', 'май', 'июн.',
  'июл.', 'авг.', 'сен.',
  'окт.', 'ноя.', 'дек.'
];

const Calc = () => {
  const [monthPay, setMonthPay] = useState("784 430.98" );
  const [percent, setPercent] = useState(13);
  const [creditTerm, setCreditTerm] = useState(30);
  const [summToPay, setSummToPay] = useState("23 532 929.55");
  const [creditSumm, setCreditSumm] = useState("20 000 000.00");
  const [taxes, setTaxes] = useState("658 000");
  const [income, setIncome] = useState("1 241 379.31");
  const [cookies, setCookie] = useCookies([]);
  const [finalMassFirst, setFinalMass] = useState([]);
  const [table, setTable] = useState(false);
  const [shedule, setShedule] = useState(false);

  const mainData = {finalMassFirst};

  useEffect((cookies) => {
    if (getCookie("newMonthPay") !== '') {
      setMonthPay(getCookie("newMonthPay"));
    }
    if (getCookie("newSummToPay") !== '') {
      setSummToPay(getCookie("newSummToPay"));
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
    if (getCookie("newCreditTerm") !== '') {
      setCreditTerm(getCookie("newCreditTerm"));
    }
  }, []);

  const sheduleDataFunc = (data) => {
    let shedulePercent = percentList[data.goal];
    let sheduleCreditSumm = (data.realEstateCost-data.downPayment);
    let sheduleCreditTerm = data.creditTerm;

    let commonPerc = Math.pow((1 + shedulePercent/12/100), sheduleCreditTerm);
    let sheduleMonthPay = sheduleCreditSumm*(shedulePercent/12/100 + shedulePercent/12/100/(commonPerc - 1));
    let finalMass = [];
    let i = sheduleCreditTerm;
    let mainPerc = sheduleMonthPay;

    let newData = new Date();
    let newYear = newData.getFullYear();
    let newMonth = newData.getMonth();
    let month = newMonth;
    //let overpayment = sheduleMonthPay * sheduleCreditTerm - sheduleCreditSumm;

    while (i > 0) {
      let percentCredit = sheduleCreditSumm*shedulePercent/12/100;
      mainPerc = sheduleMonthPay - percentCredit;
      sheduleCreditSumm = sheduleCreditSumm - mainPerc;

      let nextElem = {};
      let dateName = `${ MONTHMASS[month] + ' ' + newYear}`;

      if (month === 11) {
        month = 0;
        newYear++;
      } else {
        month = month + 1;
      }

      nextElem['rub'] = `${mainPerc.toFixed(2) + ' '}`;
      nextElem['rubDop'] = `${percentCredit.toFixed(2) + ' '}`;
      nextElem['name'] = dateName;
      nextElem['summLeft'] = `${sheduleCreditSumm.toFixed(2) + ' '}`;
      nextElem['monthPay'] = `${sheduleMonthPay.toFixed(2) + ' '}`

      finalMass.push(nextElem);

      i--;
    }

    setFinalMass(finalMass);
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

  const handleCookie = (data) => { 
    for (let key in data) {
      setCookie(key, data[key]);
    }
  }

  const callFunc = (data) => {
    let newPercent = percentList[data.goal];
    setCookie("newPercent",newPercent);
    setPercent(newPercent);

    let newCreditTerm = data.creditTerm;
    setCookie("newCreditTerm",newCreditTerm);

    let newMonthPay = (data.realEstateCost-data.downPayment)*(percent/12/100 + percent/12/100/(Math.pow((1 + percent/12/100), newCreditTerm) - 1));
    if (newMonthPay < 0) {
      setCookie("newMonthPay", 0);
      setMonthPay(0);
    } else {
      setCookie("newMonthPay", newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setMonthPay(newMonthPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }

    let newSummToPay = newMonthPay * newCreditTerm;
    if (newSummToPay < 0) {
      setCookie("newSummToPay", 0);
      setSummToPay(0);
    } else {
      setCookie("newSummToPay", newSummToPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setSummToPay(newSummToPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }

    let newCreditSumm = (data.realEstateCost-data.downPayment);
    if (newCreditSumm < 0) {
      setCookie("newCreditSumm", 0);
      setCreditSumm(0);
    } else {
      setCookie("newCreditSumm",newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setCreditSumm(newCreditSumm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }

    let newIncome = (Number(newMonthPay)*1.8);
    if (newIncome < 0) {
      setCookie("newIncome",0);
      setIncome(0);
    } else {
      setCookie("newIncome",newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      setIncome(newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }

    handleCookie(data);
    sheduleDataFunc(data);
    Object.assign(mainData, data);
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
            <InfoPoint name="Общая сумма кредита"  count={summToPay} type="руб." />
          </div>
          <FormCalc onSubmitParent={callFunc}/>
          <div className="buttons-wrapper">
            <ButtonComp name="Показать график платежей" func={() => setShedule(true)} />
            <ButtonComp name="Показать таблицу платежей" func={() => setTable(true)} />
          </div>
        </div>
      </div>
      {shedule && <PaymentShedule dataInfo={finalMassFirst}/>}
      {table && <TablePayment tableInfo={finalMassFirst}/>}
    </>
  )
}

export default Calc