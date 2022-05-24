import React from "react";
import { TextField, MenuItem } from "@mui/material";
import {  Controller } from "react-hook-form";

const OPTIONS = [
  {
    label: "Квартира в новостройке",
    value: "1",
  },
  {
    label: "Квартира на вторичном рынке",
    value: "2",
  },
  {
    label: "КупитьДом",
    value: "3",
  },
  {
    label: "Построть Дом",
    value: "4",
  },
  {
    label: "Купить землю или дачный дом",
    value: "5",
  },
  {
    label: "Рефинансирование",
    value: "6",
  },
  {
    label: "Наличные под залог жилья",
    value: "7",
  },
];

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