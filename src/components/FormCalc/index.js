import './index.scss';
import React, { useEffect, useState } from "react";
import { useForm, setError } from "react-hook-form";
import { useCookies } from 'react-cookie';
import FormInputDropdown from "../FormInputDropdown";
import TextFieldInput from "../TextFieldInput";

const FormCalc = ({onSubmitParent}) => {
  const { handleSubmit, getValues, control, setError, formState: { errors }} = useForm({mode: 'all', reValidateMode: 'onBlur',});
  const [mainData, setMainData] = useState({});
  const [cookies, setCookie] = useCookies([]);
  let realEstateCostData = cookies.realEstateCost;
  let downPaymentData = cookies.downPayment;
  let creditTermData = cookies.creditTerm;

  const cookiesData = (cookies) => {
    if (realEstateCostData !== undefined) {
      realEstateCostData = realEstateCostData.replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (downPaymentData !== undefined) {
      downPaymentData = downPaymentData.replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (creditTermData !== undefined) {
      creditTermData = creditTermData.replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }

  useEffect(()=> {
    console.log('mount');
    const values = getValues();
    if (Number(values["realEstateCost"].replace(/\s+/g, '')) <= Number(values["downPayment"].replace(/\s+/g, ''))) {
      setError("realEstateCost", "notEqual", "Passwords are different");
      return false;
    } else {
      //handleChange();
      return true;
    }
  }, [])

  cookiesData(cookies);

  const inputValidation = () => {
    const values = getValues();
    if (Number(values["realEstateCost"].replace(/\s+/g, '')) <= Number(values["downPayment"].replace(/\s+/g, ''))) {
      return false;
    } else {
      //handleChange();
      return true;
    }
  }

  const inputMonthValidation = (creditTerm) => {
    const values = getValues();
    if (Number(creditTerm.replace(/\s+/g, '')) <= 1 || Number(creditTerm.replace(/\s+/g, '')) > 240) {
      return false;
    } else {
      handleChange();
      return true;
    }
  }

  function handleCookie(data) {
    for (let key in data) {
      setCookie(key, data[key]);
    }
    if (errors) {
      for (let key in errors) {
        setCookie(key, errors[key]);
      }
    }
  }

  const handleChange = () => {
    if ((errors.downPayment && errors.downPayment.type === "validate" && true) || (errors.realEstateCost && errors.realEstateCost.type && true) || (errors.creditTerm && errors.creditTerm.type === "validate" && true)) {
    } else {
      const values = getValues();
      for (let key in values) {
        if (key !== 'goal') {
          values[key] = Number(values[key].replace(/\s+/g, ''));
        }
      }
      setMainData(mainData => Object.assign(mainData, values));
      onSubmitParent(mainData);
      handleCookie(mainData);
    }
  }
   
  return (
    <form className="calcForm" onBlur={handleSubmit(handleChange)} onChange={handleSubmit(handleChange)}>
      <div className="calcForm__wrapper-box">
        <FormInputDropdown
          name="goal"
          control={control}
          label="Тип недвижимости"
          defValue={cookies.goal ?? "1"}
          helperText="Выберите ваш тип недвижимости"/>
        <TextFieldInput
          error={errors.realEstateCost && errors.realEstateCost.type === "validate" && true}
          control={control}
          //onCustomChange={handleChange}
          name="realEstateCost"
          label="Стоимость недвижимости"
          ps="руб."
          defValue={realEstateCostData ?? "30 000 000"}
          rules={{ required: "Первый взнос не может быть больше", validate: inputValidation, deps: ['downPayment','creditTerm']  }}
          helperText={errors.realEstateCost && errors.realEstateCost.type === "validate" && "Первый взнос не может быть больше"}
        />
        <TextFieldInput
          error={errors.downPayment && errors.downPayment.type === "validate" && true}
          control={control}
          //onCustomChange={handleChange}
          name="downPayment"
          label="Первоначальный взнос"
          ps="руб."
          defValue={downPaymentData ?? "10 000 000"}
          rules={{ required: "Первый взнос не может быть больше", validate: inputValidation, deps: ['realEstateCost','creditTerm'] }}
          helperText={errors.downPayment && errors.downPayment.type === "validate" && "Первый взнос не может быть больше"}
        />
        <TextFieldInput
          error={errors.creditTerm && errors.creditTerm.type === "validate" && true}
          control={control}
          //onCustomChange={handleChange}
          name="creditTerm"
          label="Срок кредита"
          ps="мес."
          defValue={creditTermData ?? "30"}
          rules={{ required: "Срок кредита не может быть меньше 1 мес", validate: inputMonthValidation, deps: ['realEstateCost','downPayment'] }}
          helperText={errors.creditTerm && errors.creditTerm.type === "validate" && "Срок кредита не может быть меньше 1 и больше 240"}
        />
      </div>
    </form>
  );
}

export default FormCalc