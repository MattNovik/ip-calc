import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './index.scss';

const ToggleTheme = ({valueTheme, onChangeTheme}) => {
  const [theme, setTheme] = useState(valueTheme ? valueTheme : 'dark');

  const getTheme = () => {
    if (`${window?.localStorage?.getItem('theme')}` === 'dark') return 'dark';
    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return 'light';

    return 'light';
  }

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <ToggleButtonGroup
      color='primary'
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