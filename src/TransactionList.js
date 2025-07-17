import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import AuthContext from "./helpers/Auth";
import { Alert, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TransactionList = () => {
  const { accountId } = useParams();
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();
  const [transactions, setTransactions] = React.useState([]);
  const [errorTost, setErrorTost] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const respose = await axios.get(
          `http://localhost:8888/api/v1/customer/transactions/${accountId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (respose.status === 200) {
          const { list } = respose.data;
          console.log(list);
          setTransactions(list);
        }
      } catch (error) {
        const {
          response: { data },
          message,
        } = error;
        if (typeof data == "string") {
          setErrorTost(data);
        } else {
          setErrorTost(message);
        }
      }
    })();
  }, []);
  // return <React.Fragment>{accountId}</React.Fragment>;
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell align="right">Account ID</StyledTableCell>
              <StyledTableCell align="right">isCredit</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Decscription</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.account_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.isCredit.toString()}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="right">{row.desc}</StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={errorTost.length > 0}
        autoHideDuration={6000}
        onClose={() => setErrorTost("")}
      >
        <Alert
          onClose={() => setErrorTost("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorTost}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default TransactionList;
