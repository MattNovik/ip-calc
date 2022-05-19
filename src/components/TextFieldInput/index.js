import { TextField } from "@mui/material";
import React from "react";
import { Controller} from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { SliderInputComp } from '../SliderInputComp';

const TextFieldInput = ({name,label,ps,defValue, error, helperText, onCustomChange, control, rules}) => {


  const handleValidateNumbers = (e) => {
    const newValueInput = e.target.value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    e.target.value = newValueInput;
  }

  return (
      <Controller
        name={name}
        control={control}
        defaultValue={defValue}
        rules={rules}
        render={({ field: { onChange, value }}) => (
          <TextField
            onChange={(e) => {
              handleValidateNumbers(e);
              //onCustomChange();
              onChange(e);
            }}
            error={error ?? false}
            value={value}
            label={label}
            maxLength='15'
            helperText={helperText ?? false}
            InputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*',
              endAdornment: <InputAdornment position="end">{ps}</InputAdornment>,
            }}
          />
        )}
      />
  );
};

export default TextFieldInput