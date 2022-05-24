import React from "react";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import "./index.scss"

export default function TablePayment(tableInfo) {

  const  createData = (name, mainPay, percPay, summLeft, monthPay) => {
    return { name, mainPay, percPay, summLeft, monthPay };
  }

  const createListData = (tableInfo) => {
    let newElem;
    let newRows = [];
    tableInfo.tableInfo.map((elem) => {
      newElem = createData(elem.name, elem.rub.replace(/\B(?=(\d{3})+(?!\d))/g, " "), elem.rubDop.replace(/\B(?=(\d{3})+(?!\d))/g, " "), elem.summLeft.replace(/\B(?=(\d{3})+(?!\d))/g, " "), elem.monthPay.replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      newRows.push(newElem);
    })
    return newRows;
  };

  const rows = createListData(tableInfo);

  return (
    <div className="table-payment">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">№</TableCell>
                <TableCell align="left">Дата оплаты</TableCell>
                <TableCell align="center">Погашение основного долга</TableCell>
                <TableCell align="center">Погашение процентов</TableCell>
                <TableCell align="center">Сумма выплаты</TableCell>
                <TableCell align="right">Остаток долга</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row,index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.mainPay}</TableCell>
                  <TableCell align="center">{row.percPay}</TableCell>
                  <TableCell align="center">{row.monthPay}</TableCell>
                  <TableCell align="right">{row.summLeft}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
    </div>
  );
}