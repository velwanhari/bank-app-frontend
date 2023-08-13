import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Account_id,AccountType,CustomerId,AccountNumber,Amount) {
  return { Account_id,AccountType,CustomerId,AccountNumber,Amount };
}

const rows = [
  createData('64bd0d3fdf4ef91f6e16c34e', 'saving', '64b002994adc6a24ec41759c', 70464, 100),
  createData('64ce31c4f20b0d381139ca8d', 'current', '64b002994adc6a24ec41759c',32865, 30),
];

export default function Accountlist() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Account_id</StyledTableCell>
            <StyledTableCell align="right">Account Type</StyledTableCell>
            <StyledTableCell align="right">Customer Id</StyledTableCell>
            <StyledTableCell align="right">Acount Number</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.Account_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.AccountType}</StyledTableCell>
              <StyledTableCell align="right">{row.CustomerId}</StyledTableCell>
              <StyledTableCell align="right">{row.AccountNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.Amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}