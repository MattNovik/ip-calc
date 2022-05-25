import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import './index.scss';

const TogglesComp = ({toggleFunc}) => {
  const [typeCredit, setTypeCredit] = useState('ann');

  const handleChange = (
    event,
    newTypeCredit,
  ) => {
    setTypeCredit(newTypeCredit);
    toggleFunc(newTypeCredit);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={typeCredit}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="ann">Аннуитетная</ToggleButton>
      <ToggleButton value="dif">Дифференциальная</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TogglesComp;
