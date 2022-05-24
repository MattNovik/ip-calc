import { Button } from '@mui/material';
import './index.scss';

const ButtonComp = (props) => {
  return (
    <Button variant="contained" onClick={props.func}>{props.name}</Button>
  );
}

export default ButtonComp;