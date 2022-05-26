import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import {  Controller } from 'react-hook-form';
import { OPTIONS } from '../../data/data';

const FormInputDropdown= ({name, control, label, helperText, defValue}) => {

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
      defaultValue={defValue}
      render={({ field: { onChange, value } }) => (
        <TextField
          select
          helperText={helperText}
          label={label}
          onChange={(e) => {
            onChange(e);
          }}
          value={value}>
            {generateSelectOptions()}
        </TextField>
      )}
    />
};

export default FormInputDropdown;