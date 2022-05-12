import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CalcInput = (props) => {
  const { register, handleSubmit } = useForm();
  const {label,nameCla,placeholder,typeInput,pattern,value,k} = props;
  const [count, setCount] = useState(value); 
  const [type, setType] = useState(k);

  return (
    <>
      <div>
        <label>{`${label}`}</label>
        <input type= {typeInput ? typeInput : ''} {...register(nameCla, {required: true, valueAsNumber: true, pattern: {value: pattern, message: 'error message'}})} placeholder={placeholder}/>
      </div>
    </>
  )
}

export default CalcInput