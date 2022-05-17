import React from "react";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import './index.scss';
import CalcInput from "../CalcInput";
import FormInputDropdown from "../SelectInput";

const FormCalc = ({onSubmitParent}) => {
  const { register, handleSubmit, getValues, control } = useForm({mode: 'all'});
  const [mainData, setMainData] = useState({});

  const onSubmit = (data) => {
    setMainData(mainData => Object.assign(mainData, data));
    onSubmitParent(mainData);
  };

  const handleValidateNumbers = (e) => {
    setTimeout(() => {
      const newValueInput = e.target.value.replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      e.target.value = newValueInput;
    }, 0);
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
      console.log(mainData);
    }, 0);
  }

  const commonFunction = (e) => {
    if (e.target.tagName === "SELECT") {
      e.target.blur();
    }
    handleChange();
    handleValidateNumbers(e);
  }
   
  return (
    <form className="calcForm">
      <div className="calcForm__wrapper-box">
        <FormInputDropdown name="mee" label="Selector" control={control}/>
        <div className="calcInput">
          <label className="calcInput__label">Цель кредита</label>
          <select className="calcInput__select" {...register("goal", {required: true, pattern: {value: "", message: 'error message'}})} defaultValue="1" placeholder={30} onChange={commonFunction} >
            <option value="1">Квартира в новостройке</option>
            <option value="2">Квартира на вторичном рынке</option>
            <option value="3">КупитьДом</option>
            <option value="4">Построть Дом</option>
            <option value="5">Купить землю или дачный дом</option>
            <option value="6">Рефинансирование</option>
            <option value="7">Наличные под залог жилья</option>
          </select>
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Стоимость недвижимости</label>
          <input className="calcInput__input" type="" {...register("realEstateCost", {required: true, pattern: {value: /\B(?=(\d{3})+(?!\d))/g, message: 'error message'} })} placeholder="30 000 000" defaultValue="30 000 000" onKeyDown={commonFunction} />
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Первоначальный взнос</label>
          <input className="calcInput__input" type="" {...register("downPayment", {required: true, pattern: /[^\d]/g })} placeholder="1 000 000" defaultValue="10 000 000" onKeyDown={commonFunction} />
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Срок кредита</label>
          <input className="calcInput__input" type="" {...register("creditTerm", {required: true,  pattern: {value: /\B(?=(\d{3})+(?!\d))/g, message: 'error message'} })} placeholder="30" defaultValue="30" onKeyDown={commonFunction} />
        </div>
      </div>
    </form>
  );
}

export default FormCalc