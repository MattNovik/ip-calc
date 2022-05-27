import React from 'react';
import { Slider } from '@mui/material';

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

export const SliderInputComp = () => {
  return(
    <Slider
      size="small"
      defaultValue={70}
      aria-label="Small"
      valueLabelDisplay="auto"
    />
  );
};