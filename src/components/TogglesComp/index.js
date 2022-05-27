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
      color='info'
      value={creditType}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value='ann'>Аннуитетный
        <div className='button-helper'>
          Some info about credit type
        </div>
      </ToggleButton>
      <ToggleButton value='dif'>Дифференциальный
        <div className='button-helper'>
          Some info about credit type
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TogglesComp;
