import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './index.scss';

const ToggleTheme = ({valueTheme, onChangeTheme}) => {
  const [theme, setTheme] = useState(valueTheme ? valueTheme : 'light');

  useEffect(() => {
    setTheme(`${window?.localStorage?.getItem('theme')}`);
  }, []);

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={theme}
      exclusive
      onChange={(e) => {
        onChangeTheme(e);
        handleChange(e, valueTheme);
      }}
    >
      <ToggleButton value='dark'>dark</ToggleButton>
      <ToggleButton value='light'>light</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleTheme;