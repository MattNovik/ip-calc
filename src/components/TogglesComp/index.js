import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { debounce } from 'throttle-debounce';
import './index.scss';

const TogglesComp = ({toggleF}) => {
  const [creditType, setCreditType] = useState('ann');
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    if (cookies.newCreditType !== undefined) {
      setCreditType(cookies.newCreditType);
    }
  }, [])

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
      onChange={debounce(100, handleChange)}
    >
      <ToggleButton value='ann'>Аннуитетный
        <div className='button-helper'>
        Общая сумма ежемесячных выплат остается неизменной до конца срока кредитования
        </div>
      </ToggleButton>
      <ToggleButton value='dif'>Дифференцированный
        <div className='button-helper'>
        C первого месяца и до конца срока кредита суммы выплат уменьшается
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TogglesComp;
