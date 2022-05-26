import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import './index.scss';

const TogglesComp = ({toggleF}) => {
  const [creditType, setCreditType] = useState('ann');

  const handleChange = (
    event,
    newCreditType,
  ) => {
    setCreditType(newCreditType);
    toggleF(newCreditType);
  };

  return (
    <ToggleButtonGroup
      color='primary'
      value={creditType}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value='ann'>Аннуитетный</ToggleButton>
      <ToggleButton value='dif'>Дифференциальный</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TogglesComp;
