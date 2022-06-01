import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import {  Controller } from 'react-hook-form';
import { OPTIONS } from '../../data/data';

const FormInputDropdown= ({name, control, label, helperText, defValue}) => {
  const [startValue, setStartValue] = useState(defValue);

  const generateSelectOptions = () => {
    return OPTIONS.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return <Controller
      control={control}
      name={name}
      defaultValue={startValue}
      render={({ field: { onChange, value } }) => (
        <TextField
          select
          helperText={helperText}
          label={label}
          onChange={(e) => {
            setStartValue(e.target.value);
            onChange(e);
          }}
          value={startValue}>
            {generateSelectOptions()}
        </TextField>
      )}
    />
};

export default FormInputDropdown;