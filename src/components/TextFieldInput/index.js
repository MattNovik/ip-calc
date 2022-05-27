import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Controller} from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import { handleValidateNumbers } from '../../utils/utils';
import { Slider } from '@mui/material';
import { addDigits } from '../../utils/utils';
import './index.scss';

const TextFieldInput = ({name, label, ps, defValue, error, helperText, control, rules, min, max, marks}) => {
  const [value, setValue] = useState(defValue);
  const [textFieldValue, setTextFieldValue] = useState(addDigits(typeof value === 'number' ? String(value).replace(/\s+/g, '') : value.replace(/\s+/g, '')));

  useEffect(() => {
    setTextFieldValue(addDigits(typeof value === 'number' ? String(value).replace(/\s+/g, '') : value.replace(/\s+/g, '')));
  })

  const handleSliderChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setValue(typeof e.target.value === 'number' ? e.target.value : Number(e.target.value.replace(/\s+/g, '')));
  };

  return (
      <Controller
        name={name}
        control={control}
        defaultValue={defValue}
        rules={rules}
        render={({ field: { onChange, value={textFieldValue} }}) => (
          <div className='slider-input-wrapper'>
            <TextField
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
                handleSliderChange(e, typeof e.target.value === 'number' ? e.target.value : Number(e.target.value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '')));
                onChange(e);
              }}
              aria-labelledby="input-slider"
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