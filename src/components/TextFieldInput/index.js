import { TextField } from "@mui/material";
import React from "react";
import { Controller} from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { handleValidateNumbers } from "../../utilsFunctions/utils";

const TextFieldInput = ({name,label,ps,defValue, error, helperText, control, rules}) => {
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
              onChange(e);
            }}
            error={error ?? false}
            value={value}
            label={label}
            maxLength='15'
            helperText={helperText ?? false}
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              endAdornment: <InputAdornment position="end">{ps}</InputAdornment>,
            }}
          />
        )}
      />
  );
};

export default TextFieldInput