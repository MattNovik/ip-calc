import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './index.scss';
import CalcInput from "../CalcInput";

const FormCalc = ({onSubmitParent}) => {
  const { register, handleSubmit, getValues } = useForm({mode: 'all'});
  const [mainData, setMainData] = useState({});
  const onSubmit = (data) => {
    setMainData(mainData => Object.assign(mainData, data));
    onSubmitParent(mainData);
    console.log(data);
  };

  const handleChange = () => {
    const values = getValues();
    setMainData(mainData => Object.assign(mainData, values));
    onSubmitParent(mainData);
    console.log(values);
  }
   
  return (
    <form className="calcForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="calcForm__wrapper-box">
        {/* <CalcInput label="Цель кредита" nameCla="goal" register={register}/>
        <CalcInput label="Стоимость недвижимости" nameCla="realEstateCost" register={register} placeholder="30 000 000" typeBox="input"/>
        <CalcInput label="Первоначальный взнос" nameCla="downPayment" register={register} placeholder="1 000 000" typeBox="input"/>
        <CalcInput label="Срок кредита" nameCla="creditTerm" register={register} placeholder="30" typeBox="input"/> */}
        <div className="calcInput">
          <label className="calcInput__label">Цель кредита</label>
          <select className="calcInput__select" {...register("goal", {required: true, valueAsNumber: true, pattern: {value: "", message: 'error message'}})} placeholder={30}>
            <option value="КвартираNew">Квартира в новостройке</option>
            <option value="КвартираOld">Квартира на вторичном рынке</option>
            <option value="КупитьДом">КупитьДом</option>
            <option value="Построть Дом">Построть Дом</option>
            <option value="Купить землю или дачный дом">Купить землю или дачный дом</option>
            <option value="Рефинансирование">Рефинансирование</option>
            <option value="Наличные под залог жилья">Наличные под залог жилья</option>
          </select>
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Стоимость недвижимости</label>
          <input  className="calcInput__input" type="" {...register("realEstateCost", {required: true, valueAsNumber: true, pattern: {value: "", message: 'error message'} })} placeholder="30 000 000" onChange={handleChange} />
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Первоначальный взнос</label>
          <input className="calcInput__input" type="" {...register("downPayment", {required: true, valueAsNumber: true, pattern: {value: "", message: 'error message'} })} placeholder="1 000 000" onChange={handleChange}/>
        </div>
        <div className="calcInput">
          <label className="calcInput__label">Срок кредита</label>
          <input className="calcInput__input" type="" {...register("creditTerm", {required: true, valueAsNumber: true, pattern: {value: "", message: 'error message'} })} placeholder="30" onChange={handleChange}/>
        </div>
      </div>
      <input type="submit" value="Проверить"/>
    </form>
  );
}

export default FormCalc