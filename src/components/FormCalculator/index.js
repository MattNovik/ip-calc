import './index.scss';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import FormInputDropdown from '../FormInputDropdown';
import TextFieldInput from '../TextFieldInput';
import { debounce } from 'throttle-debounce';
import { addDigits, convertArrayToNumbers } from '../../utils/utils';
import { MARKSCREDITTERM, MARKSDOWNPAYMENT, MARKSREALESTATECOST} from '../../data/data';

const FormCalculator = ({onSubmitForm, creditType}) => {
  const { handleSubmit, getValues, control, formState: { errors }} = useForm({mode: 'all', reValidateMode: 'onBlur',});
  const [mainData, setMainData] = useState({});
  const [cookies, setCookie] = useCookies([]);
  const [sliderValue, setSliderValue] = useState(null);
  let realEstateCostData = cookies.realEstateCost;
  let downPaymentData = cookies.downPayment;
  let creditTermData = cookies.creditTerm;
  let newCreditType = creditType;

  useEffect(() => {
    let data = {};
    const values = getValues();
    convertArrayToNumbers(values);
    Object.assign(data, values)
    onSubmitForm(data, newCreditType);
    updateCookies(); // достаю данные из cookies если они там есть
  }, [sliderValue, cookies]) // Вызываю генерацию таблицы и графика после инициализации

  const updateCookies = () => {
    if (realEstateCostData !== undefined) {
      realEstateCostData = addDigits(realEstateCostData.replace(/\s+/g, ''));
    }
    if (downPaymentData !== undefined) {
      downPaymentData = addDigits(downPaymentData.replace(/\s+/g, ''));
    }
    if (creditTermData !== undefined) {
      creditTermData = addDigits(creditTermData.replace(/\s+/g, ''));
    }
  }
  
  const setNewCookie = (data) => {
    for (let key in data) {
      setCookie(key, data[key]);
    }
    if (errors) {
      for (let key in errors) {
        setCookie(key, errors[key]);
      }
    }
  } // записть в cookie или обновление

  const updateSliderValue = (value) => {
    setSliderValue(value);
  }

  const inputValidation = () => {
    const values = getValues();
    convertArrayToNumbers(values);
    return (typeof values['realEstateCost'] === 'number' ? (values['realEstateCost'] <= values['downPayment'] ? false : true) : (Number(values['realEstateCost'].replace(/\s+/g, '')) <= Number(values['downPayment'].replace(/\s+/g, ''))) ? false : true);
  } // функция проверки обычного инпута числового

  const inputMonthValidation = () => {
    const values = getValues();
    return(typeof values['creditTerm'] === 'number' ? ((values['creditTerm'] <= 1 || values['creditTerm'] >= 361) ? false : true) : (Number(values['creditTerm'].replace(/\s+/g, '')) <= 1 || Number(values['creditTerm'].replace(/\s+/g, '')) >= 361) ? false : true);
  } // функция проверки поля с месяцем

  const handleChange = () => {
    if ((errors.downPayment && errors.downPayment.type === 'validate' && true) || (errors.realEstateCost && errors.realEstateCost.type && true) || (errors.creditTerm && errors.creditTerm.type === 'validate' && true)) {
    } else {
      const values = getValues();
      convertArrayToNumbers(values);
      setMainData(mainData => Object.assign(mainData, values));
      onSubmitForm(mainData, newCreditType);
      setNewCookie(mainData);
    }
  } // сбор данных, сохрание cookies и запуск данных дальше в доч. комп (f.onSybmitParent)
   
  return (
    <form className='calculatorForm' onBlur={debounce(10, handleSubmit(handleChange))} onChange={debounce(500, handleSubmit(handleChange))}>
      <div className='calculatorForm__wrapper-box'>
        <FormInputDropdown
          name='goal'
          control={control}
          label='Тип недвижимости'
          defValue={cookies.goal ?? '1'}
          helperText='Выберите ваш тип недвижимости'/>
        <TextFieldInput
          updateSliderValue={updateSliderValue}
          error={errors.realEstateCost && errors.realEstateCost.type === 'validate' && true}
          control={control}
          name='realEstateCost'
          label='Стоимость недвижимости'
          ps='руб.'
          step={100000}
          min={0}
          max={100000000}
          marks={MARKSREALESTATECOST}
          defValue={realEstateCostData ?? '30 000 000'}
          rules={{ required: 'Первый взнос не может быть больше', validate: inputValidation, deps: ['downPayment','creditTerm']  }}
          helperText={errors.realEstateCost && errors.realEstateCost.type === 'validate' && 'Первый взнос не может быть больше'}
        />
        <TextFieldInput
          updateSliderValue={updateSliderValue}
          error={errors.downPayment && errors.downPayment.type === 'validate' && true}
          control={control}
          name='downPayment'
          label='Первоначальный взнос'
          ps='руб.'
          step={10000}
          min={0}
          max={100000000}
          marks={MARKSDOWNPAYMENT}
          defValue={downPaymentData ?? '10 000 000'}
          rules={{ required: 'Первый взнос не может быть больше', validate: inputValidation, deps: ['realEstateCost','creditTerm'] }}
          helperText={errors.downPayment && errors.downPayment.type === 'validate' && 'Первый взнос не может быть больше'}
        />
        <TextFieldInput
          updateSliderValue={updateSliderValue}
          error={errors.creditTerm && errors.creditTerm.type === 'validate' && true}
          control={control}
          name='creditTerm'
          label='Срок кредита'
          ps='мес.'
          step={1}
          min={2}
          max={360}
          marks={MARKSCREDITTERM}
          defValue={creditTermData ?? '30'}
          rules={{ required: 'Срок кредита не может быть меньше 1 мес', validate: inputMonthValidation, deps: ['realEstateCost','downPayment'] }}
          helperText={errors.creditTerm && errors.creditTerm.type === 'validate' && 'Срок кредита не может быть меньше 1 и больше 340'}
        />
      </div>
    </form>
  );
}

export default FormCalculator