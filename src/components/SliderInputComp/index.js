import React from "react";
import { Slider } from "@mui/material";
import { Controller } from "react-hook-form";

const MARKS = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '100',
  },
];

export const SliderInputComp = ({name,control}) => {
  return <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <Slider
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          defaultValue={70}
          marks={MARKS}
        />
      )}
    />
};