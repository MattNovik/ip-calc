import Calc from '../Calculator';
import PaymentShedule from '../PaymentShedule';
import TablePayment from '../TablePayment';
import { useState } from 'react';
import Loader from 'react-loaders';

const Main = () => {
  const [table, setTable] = useState(false);
  const [shedule, setShedule] = useState(false);
  const [finalMassFirst, setFinalMass] = useState([]);

  return (
    <>
      <Calc />
      {shedule && <PaymentShedule dataInfo={finalMassFirst}/>}
      {table && <TablePayment tableInfo={finalMassFirst}/>}
      <Loader type='pacman'/>
    </>
  )
}

export default Main;