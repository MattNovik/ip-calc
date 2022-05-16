import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './index.scss';

const CalcInput = (props) => {
  const { register, handleSubmit } = useForm();
  const {label,nameCla,placeholder,typeInput,pattern,value,k,typeBox} = props;
  const [count, setCount] = useState(value); 
  const [type, setType] = useState(k);

  if (typeBox === "input") {
    return (
      <div className="calcInput">
        <label className="calcInput__label">{label}</label>
        <input className="calcForm__input" placeholder={placeholder} type= {typeInput ? typeInput : ''} {...register(nameCla, {required: true, valueAsNumber: true, pattern: {value: pattern, message: 'error message'}})} />
      </div>
    )
  } else {
    return (
      <div className="calcInput">
        <label className="calcInput__label">{label}</label>
        <select className="calcInput__select" {...register(nameCla, {required: true, valueAsNumber: true, pattern: {value: pattern, message: 'error message'}})} placeholder={placeholder}>
          <option value="КвартираNew">Квартира в новостройке</option>
          <option value="КвартираOld">Квартира на вторичном рынке</option>
          <option value="КупитьДом">КупитьДом</option>
          <option value="Построть Дом">Построть Дом</option>
          <option value="Купить землю или дачный дом">Купить землю или дачный дом</option>
          <option value="Рефинансирование">Рефинансирование</option>
          <option value="Наличные под залог жилья">Наличные под залог жилья</option>
        </select>
      </div>
    )
  }
}

export default CalcInput