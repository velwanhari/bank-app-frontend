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
import { Alert, Button, Snackbar } from "@mui/material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { useNavigate } from "react-router-dom";

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

export default function Accountlist() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = React.useState([]);
  const [errorTost, setErrorTost] = React.useState("");
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

  const openTransaction = (accountId) => {
    navigate(`/transactions/${accountId}`);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const respose = await axios.get(
          "http://localhost:8888/api/v1/customer/accountLIst",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (respose.status === 200) {
          const { accounts } = respose.data;
          setAccounts(accounts);
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
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Account ID</StyledTableCell>
              <StyledTableCell align="right">Account Type</StyledTableCell>
              <StyledTableCell align="right">Acount Number</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Transaction</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.accountType}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.accountNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => openTransaction(row._id)}>
                    <ChecklistRtlIcon />
                  </Button>
                </StyledTableCell>
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
}
