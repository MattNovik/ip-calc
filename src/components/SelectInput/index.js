import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const options = [
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

const FormInputDropdown= ({name,control, label}) => {

  const generateSelectOptions = () => {
    return options.map((option) => {
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
      render={({ field: { onChange, value } }) => (
        <Select onChange={onChange} value={value ?? "1"}>
          {generateSelectOptions()}
        </Select>
      )}
    />
};

export default FormInputDropdown;