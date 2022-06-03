import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import InfoPoint from '../InfoPont';
import FormCalculator from '../FormCalculator';
import './index.scss';
import PaymentShedule from '../PaymentShedule';
import TablePayment from '../TablePayment';
import ButtonComp from '../ButtonComp';
import TogglesComp from '../TogglesComp';
import { MONTHMASS, PERCENTLIST } from '../../data/data';
import { roundAndAddDigits, addDigits } from '../../utils/utils';
import Loader from 'react-loaders';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const Calculator = () => {
  const [monthPay, setMonthPay] = useState('784 430.98' );
  const [percent, setPercent] = useState(13);
  const [creditTerm, setCreditTerm] = useState(30);
  const [summToPay, setSummToPay] = useState('23 532 929.55');
  const [creditSumm, setCreditSumm] = useState('20 000 000.00');
  const [taxes, setTaxes] = useState('658 000');
  const [income, setIncome] = useState('1 241 379.31');
  const [cookies, setCookie] = useCookies([]);
  const [creditData, setCreditData] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [isShedule, setIsShedule] = useState(false);
  const [creditType, setCreditType]  = useState('ann');
  const [mainData, setMainData] = useState();


  useEffect(() => {
    if (cookies.newMonthPay !== undefined) {
      setMonthPay(cookies.newMonthPay);
    }
    if (cookies.newSummToPay !== undefined) {
      setSummToPay(cookies.newSummToPay);
    }
    if (cookies.newTaxes !== undefined) {
      setTaxes(cookies.newTaxes);
    }
    if (cookies.newPercent !== undefined) {
      setPercent(cookies.newPercent);
    }
    if (cookies.newCreditSumm !== undefined) {
      setCreditSumm(cookies.newCreditSumm);
    }
    if (cookies.newIncome !== undefined) {
      setIncome(cookies.newIncome);
    } 
    if (cookies.newCreditTerm !== undefined) {
      setCreditTerm(cookies.newCreditTerm);
    }
    if (cookies.newCreditType !== undefined) {
      setCreditType(cookies.newCreditType);
    }
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const createDataForShedule = (data, type) => {
    let newData = new Date();
    let newYear = newData.getFullYear();
    let newMonth = newData.getMonth();
    let month = newMonth;

    let shedulePercent = PERCENTLIST[data.goal];
    let sheduleCreditSumm = (data.realEstateCost-data.downPayment);
    if (sheduleCreditSumm >= 0) {
      let sheduleCreditTerm = data.creditTerm;

      let result = [];
      let i = sheduleCreditTerm;
      let mainPerc;
      let sheduleMonthPay;

      if (type === 'dif') {
        mainPerc = sheduleCreditSumm/sheduleCreditTerm;

        while (i > 0) {
          let percentCredit = sheduleCreditSumm*shedulePercent/100/12;
          sheduleCreditSumm = sheduleCreditSumm - mainPerc;
          sheduleMonthPay = mainPerc + percentCredit;

          let nextElem = {};
          let dateName = `${ MONTHMASS[month] + ' ' + newYear}`;

          if (month === 11) {
            month = 0;
            newYear++;
          } else {
            month = month + 1;
          }

          nextElem['rub'] = `${mainPerc.toFixed(0) + ' '}`;
          nextElem['rubDop'] = `${percentCredit.toFixed(0) + ' '}`;
          nextElem['name'] = dateName;
          nextElem['summLeft'] = `${Math.abs(sheduleCreditSumm.toFixed(0)) + ' '}`;
          nextElem['monthPay'] = `${sheduleMonthPay.toFixed(0) + ' '}`

          result.push(nextElem);

          i--;
        }

        setCreditData(result);
      } else {
        let commonPerc = Math.pow((1 + shedulePercent/12/100), sheduleCreditTerm);
        sheduleMonthPay = sheduleCreditSumm*(shedulePercent/12/100 + shedulePercent/12/100/(commonPerc - 1));
        mainPerc = sheduleMonthPay;

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

          nextElem['rub'] = `${mainPerc.toFixed(0) + ' '}`;
          nextElem['rubDop'] = `${percentCredit.toFixed(0) + ' '}`;
          nextElem['name'] = dateName;
          nextElem['summLeft'] = `${Math.abs(sheduleCreditSumm.toFixed(0)) + ' '}`;
          nextElem['monthPay'] = `${sheduleMonthPay.toFixed(0) + ' '}`

          result.push(nextElem);

          i--;
        }

        setCreditData(result);
      }
    } else {
      setCreditData([]);
    }
  }

  const setNewCookie = (data) => { 
    for (let key in data) {
      setCookie(key, data[key]);
    }
  }

  const updateDataCalculation = (data, type) => {
    let newPercent = PERCENTLIST[data.goal];
    setCookie('newPercent',newPercent);
    setPercent(newPercent);
    setMainData(data);

    let newCreditTerm = data.creditTerm;
    setCookie('newCreditTerm', newCreditTerm);

    let newCreditSumm = (data.realEstateCost-data.downPayment);
    if (newCreditSumm < 0) {
      setCookie('newCreditSumm', 0);
      setCreditSumm(0);
    } else {
      setCookie('newCreditSumm', roundAndAddDigits(newCreditSumm));
      setCreditSumm(roundAndAddDigits(newCreditSumm));
    }

    if (type === 'dif') {
      let mainPerc = newCreditSumm/newCreditTerm;
      let mainCreditSumm = newCreditSumm;
      let mainMonthPay;
      let i = newCreditTerm;
      let result = [];
      let newSummToPay = 0;
      let overpayment = 0;

      while (i > 0) {
        let percentCredit = mainCreditSumm*newPercent/100/12;
        mainCreditSumm = mainCreditSumm - mainPerc;
        mainMonthPay = mainPerc + percentCredit;
        result.push(mainMonthPay.toFixed(0));
        newSummToPay = newSummToPay + mainMonthPay;
        overpayment = overpayment + percentCredit;

        i--;
      }

      let newTaxes = (data.realEstateCost*13/100 >= 260000 ? 260000 : data.realEstateCost*13/100) + (overpayment*13/100 >= 390000 ? 390000 : overpayment*13/100);
      if (newSummToPay < 0) {
        setCookie('newSummToPay', 0);
        setCookie('newTaxes',0);
        setTaxes(0);
        setSummToPay(0);
      } else {
        setCookie('newSummToPay', roundAndAddDigits(newSummToPay));
        setCookie('newTaxes', roundAndAddDigits(Number(newTaxes)));
        setTaxes(roundAndAddDigits(Number(newTaxes)));
        setSummToPay(roundAndAddDigits(newSummToPay));
      }

      if (result[0] < 0 || result[result.length-1] < 0) {
        setCookie('newMonthPay', 0);
        setMonthPay(0);
      } else {
        setCookie('newMonthPay', `${'от ' + addDigits(result[result.length-1]) + ' руб. до ' + addDigits(result[0])}`);
        setMonthPay(`${'от ' + addDigits(result[result.length-1]) + ' руб. до ' + addDigits(result[0])}`);
      }

      let newIncome = (Number(result[0])*1.8);
      if (newIncome < 0) {
        setCookie('newIncome',0);
        setIncome(0);
      } else {
        setCookie('newIncome', roundAndAddDigits(newIncome));
        setIncome(roundAndAddDigits(newIncome));
      }
    } else {
      let newMonthPay = (data.realEstateCost-data.downPayment)*(newPercent/12/100 + newPercent/12/100/(Math.pow((1 + newPercent/12/100), newCreditTerm) - 1));
      if (newMonthPay < 0) {
        setCookie('newMonthPay', 0);
        setMonthPay(0);
      } else {
        setCookie('newMonthPay', roundAndAddDigits(newMonthPay));
        setMonthPay(roundAndAddDigits(newMonthPay));
      }

      let newSummToPay = newMonthPay * newCreditTerm;
      let newTaxes = (data.realEstateCost*13/100 >= 260000 ? 260000 : data.realEstateCost*13/100) + ((newSummToPay-data.realEstateCost+data.downPayment)*13/100 >= 390000 ? 390000 : (newSummToPay-data.realEstateCost+data.downPayment)*13/100);
      if (newSummToPay < 0) {
        setCookie('newSummToPay', 0);
        setCookie('newTaxes',0);
        setTaxes(0);
        setSummToPay(0);
      } else {
        setCookie('newSummToPay', roundAndAddDigits(newSummToPay));
        setCookie('newTaxes', roundAndAddDigits(Number(newTaxes)));
        setTaxes(roundAndAddDigits(Number(newTaxes)));
        setSummToPay(roundAndAddDigits(newSummToPay));
      }

      let newIncome = (Number(newMonthPay)*1.8);
      if (newIncome < 0) {
        setCookie('newIncome',0);
        setIncome(0);
      } else {
        setCookie('newIncome',roundAndAddDigits(newIncome));
        setIncome(roundAndAddDigits(newIncome));
      }
    }

    setNewCookie(data);
    createDataForShedule(data, type);
  } // передаю функцию в компоннет FormCalculator для расчетов и получения данных

  const changeCreditType = (data) => {
    setCreditType(data);
    setCookie('newCreditType', data);
    updateDataCalculation(mainData, data);
  } // передаю функцию в компоннент TogglesComp для получения значения типа кредита

  return (
    <>
      <div className='calculator'>
        <h1 className='calculator__name'>
          Ипотечный калькулятор
        </h1>
        <div className='calculator__block'>
          <div className='calculator__info'>
            <InfoPoint name='Ежемесячный платеж' count={monthPay} type='руб.'/>
            <InfoPoint name='Сумма кредита'  count={creditSumm} type='руб.' />
            <InfoPoint name='Ставка по кредиту'  count={percent} type='%' />
            <InfoPoint name='Общая сумма кредита'  count={summToPay} type='руб.' />
            <InfoPoint name='Налоговый вычет'  count={taxes} type='руб.' circleInfo='true' hintText='Some info more info about this point' />
            <InfoPoint name='Необходимый доход'  count={income} type='руб.' />
          </div>
          <FormCalculator onSubmitForm={updateDataCalculation} creditType={creditType}/>
          <div className='buttons-wrapper'>
            <ButtonComp name='Показать график платежей' func={() => {setIsShedule(!isShedule); isShedule ? gsap.to(window, {duration: 1, scrollTo:{y: 0, x: 0}}) : gsap.to(window, {duration: 1, scrollTo:"#payment-shedule"})}} />
            <ButtonComp name='Показать таблицу платежей' func={() => { setIsTable(!isTable); isTable ? gsap.to(window, {duration: 1, scrollTo:{y: 0, x: 0}}) : gsap.to(window, {duration: 1, scrollTo:"#table-payment"})}}/>
            <TogglesComp toggleF={changeCreditType}/>
          </div>
        </div>
      </div>
      {isShedule && <PaymentShedule data={creditData}/>}
      {isTable && <TablePayment data={creditData}/>}
      <Loader type='pacman' />
    </>
  )
}

export default Calculator