import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./helpers/Auth";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Paper } from "@mui/material";

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

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = React.useState([]);
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

  React.useEffect(() => {
    (async () => {
      try {
        const respose = await axios.post(
          "http://localhost:8888/api/v1/staff/customerList",
          {
            customerId: "",
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (respose.status === 200) {
          const { customers } = respose.data;
          setCustomers(customers);
        }
      } catch (error) {
        // const {
        //   response: { data },
        //   message,
        // } = error;
        // if (typeof data == "string") {
        //   setErrorTost(data);
        // } else {
        //   setErrorTost(message);
        // }
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Pan Number</StyledTableCell>
              <StyledTableCell align="right">KYC</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ textTransform: "uppercase" }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.pan}</StyledTableCell>
                <StyledTableCell align="right">{row.kyc}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => navigate(`/customer-kyc/${row._id}`)}>
                    KYC
                  </Button>
                  <Button
                    onClick={() => navigate(`/customer-transaction/${row._id}`)}
                  >
                    Transaction
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Customers;
