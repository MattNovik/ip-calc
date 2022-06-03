import React from 'react';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import './index.scss';
import { addDigits } from '../../utils/utils';

const TablePayment = (data) => {

  const  createData = (name, mainPay, percentPay, summLeft, monthPay) => {
    return { name, mainPay, percentPay, summLeft, monthPay };
  }

  const createListData = (data) => {
    let newElem;
    let newRows = [];
    data.data.map((elem) => {
      newElem = createData(elem.name, addDigits(elem.rub), addDigits(elem.rubDop), addDigits(elem.summLeft), addDigits(elem.monthPay));
      newRows.push(newElem);
    })
    return newRows;
  };

  const rows = createListData(data);

  return (
    <div className='table-payment' id='table-payment'>
      <h2>Таблица платежей по ипотеке</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table sx={{ minWidth: 650 }} size='small' stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>№</TableCell>
                <TableCell align='left'>Дата оплаты</TableCell>
                <TableCell align='center'>Погашение основного долга</TableCell>
                <TableCell align='center'>Погашение процентов</TableCell>
                <TableCell align='center'>Сумма выплаты</TableCell>
                <TableCell align='right'>Остаток долга</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row,index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>{row.mainPay}</TableCell>
                  <TableCell align='center'>{row.percentPay}</TableCell>
                  <TableCell align='center'>{row.monthPay}</TableCell>
                  <TableCell align='right'>{row.summLeft}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
    </div>
  );
}

export default TablePayment;