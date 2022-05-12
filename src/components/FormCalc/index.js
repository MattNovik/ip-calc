import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CalcInput from "../CalcInput";

const FormCalc = ({onSubmitParent}) => {
  const { register, handleSubmit } = useForm();
  const [firstData, setData] = useState({});
  const onSubmit = (data) => {
    setData(firstData => Object.assign(firstData, data));
    onSubmitParent(firstData);
  };
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <CalcInput label="Цель кредита" placeholder="Цель кредита" nameCla="counts"/>
      {/* <CalcInput label="Цель кредита" placeholder="Цель кредита"/>
      <CalcInput label="Цель кредита" placeholder="Цель кредита"/>
      <CalcInput pattern="/[A-Za-z]{3}/" label="Цель кредита" placeholder="Цель кредита"/> */}
      <input type="submit" value="Проверить"/>
    </form>
  );
}

export default FormCalc