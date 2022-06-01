import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import { handleValidateNumbers } from '../../utils/utils';
import { Slider } from '@mui/material';
import { addDigits } from '../../utils/utils';
import { debounce } from 'throttle-debounce';
import './index.scss';

const TextFieldInput = ({updateSliderValue, name, label, ps, defValue, error, helperText, control, rules, min, max, marks, step}) => {
  const [value, setValue] = useState(defValue);
  const [textFieldValue, setTextFieldValue] = useState(addDigits(typeof value === 'number' ? String(value).replace(/\s+/g, '') : value.replace(/\s+/g, '')));

  useEffect(() => {
    setTextFieldValue(addDigits(typeof value === 'number' ? String(value).replace(/\s+/g, '') : value.replace(/\s+/g, '')));
  }, [value])

  const handleSliderChange = (e, newValue) => {
    updateSliderValue(newValue);
  }

  const handeleSliderChangeValue = (e, newValue) => {
    setValue(newValue);
  }

  const handleInputChange = (e) => {
    setValue(typeof e.target.value === 'number' ? e.target.value : Number(e.target.value.replace(/\s+/g, '')));
  }

  return (
      <Controller
        name={name}
        control={control}
        defaultValue={defValue}
        rules={rules}
        render={({ field: { onChange, value={textFieldValue}}}) => (
          <div className='slider-input-wrapper'>
            <TextField
              key={name}
              onChange={(e) => {
                handleValidateNumbers(e);
                handleInputChange(e)
                onChange(e);
              }}
              error={error ?? false}
              value={textFieldValue}
              label={label}
              maxLength='15'
              helperText={helperText ?? false}
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                endAdornment: <InputAdornment position='end'>{ps}</InputAdornment>,
              }}
            />
            <Slider
              value={typeof value === 'number' ? value : Number(value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, ''))}
              onChange={(e) => {
                handeleSliderChangeValue(e, typeof e.target.value === 'number' ? e.target.value : Number(e.target.value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '')));
                onChange(e);
              }}
              onChangeCommitted={debounce(500, (e,value)=> {
                handleSliderChange(e, typeof value === 'number' ? value : Number(value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '')))
              })}
              aria-labelledby="input-slider"
              step={step}
              min={min}
              max={max}
              marks={marks}
            />
          </div>
        )}
      />
  );
};

export default TextFieldInput