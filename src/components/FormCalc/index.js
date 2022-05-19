import './index.scss';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import FormInputDropdown from "../FormInputDropdown";
import TextFieldInput from "../TextFieldInput";

const FormCalc = ({onSubmitParent}) => {
  const { handleSubmit, getValues, control, formState: { errors }} = useForm({mode: 'all'});
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
  cookiesData(cookies);

  const inputValidation = (realEstateCost) => {
    const values = getValues();
    if (Number(realEstateCost.replace(/\s+/g, '')) <= Number(values["downPayment"].replace(/\s+/g, ''))) {
      return false;
    } else {
      handleChange();
      return true;
    }
  }

  const inputMonthValidation = (creditTerm) => {
    const values = getValues();
    if (Number(creditTerm.replace(/\s+/g, '')) <= 1) {
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
  }

  const handleChange = () => {
    setTimeout(() => {
      const values = getValues();
      for (let key in values) {
        if (key !== 'goal') {
          values[key] = Number(values[key].replace(/\s+/g, ''));
        }
      }
      setMainData(mainData => Object.assign(mainData, values));
      onSubmitParent(mainData);
      handleCookie(mainData);
    },0);
  }
   
  return (
    <form className="calcForm"  onBlur={handleSubmit(handleChange)}>
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
          rules={{ required: true, validate: inputValidation }}
          helperText={errors.realEstateCost && errors.realEstateCost.type === "validate" && "Первый взнос не может быть больше"}
        />
        <TextFieldInput
          error={errors.realEstateCost && errors.realEstateCost.type === "validate" && true}
          control={control}
          //onCustomChange={handleChange}
          name="downPayment"
          label="Первоначальный взнос"
          ps="руб."
          defValue={downPaymentData ?? "10 000 000"}
          rules={{ required: true, validate: inputValidation }}
          helperText={errors.realEstateCost && errors.realEstateCost.type === "validate" && "Первый взнос не может быть больше"}
        />
        <TextFieldInput
          error={errors.creditTerm && errors.creditTerm.type === "validate" && true}
          control={control}
          //onCustomChange={handleChange}
          name="creditTerm"
          label="Срок кредита"
          ps="мес."
          defValue={creditTermData ?? "30"}
          rules={{ required: true, validate: inputMonthValidation }}
          helperText={errors.creditTerm && errors.creditTerm.type === "validate" && "Срок кредита не может быть меньше 1 мес"}
        />
      </div>
    </form>
  );
}

export default FormCalc