import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import AuthContext from "./helpers/Auth";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const StaffTransaction = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
    type: "",
    desc: "",
  });
  const [fieldError, setFieldError] = useState({
    accountNumber: "",
    amount: "",
    type: "",
    desc: "",
  });
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();
  const [errorTost, setErrorTost] = useState("");

  const submit = async () => {
    try {
      const payload = {
        customerId: customer._id.toString(),
        accountNumber: form.accountNumber,
        amount: form.amount,
        type: form.type === "withdraw" ? "debit" : "credit",
        desc: form.desc,
      };
      const resp = await axios.post(
        "http://localhost:8888/api/v1/staff/customer/transaction",
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resp.status === 200) {
        navigate("/customers");
      }
    } catch (error) {
      const {
        // copy from login code
        response: { data },
        message,
      } = error;
      if (typeof data == "string") {
        setErrorTost(data);
      } else {
        setErrorTost(message);
        const { errors } = data;
        const newErrorFiled = {};
        errors.forEach((errfield) => {
          const { msg, path } = errfield;
          newErrorFiled[path] = msg;
          setFieldError({ ...fieldError, ...newErrorFiled });
        });
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const respose = await axios.post(
          "http://localhost:8888/api/v1/staff/customerList",
          {
            customerId: customerId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (respose.status === 200) {
          const { customer } = respose.data;
          setCustomer(customer);
        }

        const resp = await axios.post(
          "http://localhost:8888/api/v1/staff/accountLIst",
          {
            id: customerId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (resp.status === 200) {
          const { accounts } = resp.data;
          setAccounts(accounts);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 10 }}>
        <Typography variant="h3" component="h2" marginBottom={5}>
          Transaction Page
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: 600,
            }}
          >
            <Stack spacing={6} sx={{ marginY: 4 }} width={400}>
              <InputLabel>{`Customer : ${customer.name}`}</InputLabel>
              <FormControl sx={{ m: 1, minWidth: 120 }}>

                <InputLabel>Account:</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="account"
                  variant="standard"
                  value={form.accountNumber}
                  label="Account:"
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((s) => ({ ...s, accountNumber: v }));
                    setFieldError((s) => ({
                      ...s,
                      accountNumber: "",
                    }));
                  }}
                  error={fieldError.accountNumber.length !== 0}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {accounts.map((ac) => (
                    <MenuItem key={ac._id} value={ac.accountNumber}>
                      {ac.accountNumber} {ac.accountType}
                    </MenuItem>
                  ))}
                </Select>
                {fieldError.accountNumber && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                  {fieldError.accountNumber}
                </p>
              )}
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  label="Enter Amount You want To Transfer"
                  variant="standard"
                  type="number"
                  value={form.amount}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((s) => ({ ...s, amount: v }));
                    setFieldError((er) => ({ ...er, amount: "" }));
                  }}
                  error={fieldError.amount.length !== 0}
                  helperText={fieldError.amount}
                />
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Withdraw / Deposit :</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="account"
                  variant="standard"
                  value={form.type}
                  label="Withdraw / Deposit :"
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((s) => ({ ...s, type: v }));
                    setFieldError((s) => ({
                      ...s,
                      type: "",
                    }));
                  }}
                  error={fieldError.type.length !== 0}
                  helperText={fieldError.type}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="withdraw">Withdraw</MenuItem>
                  <MenuItem value="deposit">Deposit</MenuItem>
                </Select>
                {fieldError.type && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                  {fieldError.type}
                </p>
              )}
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  label="Enter Desc"
                  variant="standard"
                  type="text"
                  value={form.desc}
                  onChange={(e) => {
                    const d = e.target.value;
                    setForm((s) => ({ ...s, desc: d }));
                    setFieldError((s) => ({ ...s, desc: "" }));
                  }}
                  error={fieldError.desc.length !== 0}
                  helperText={fieldError.desc}
                />
              </FormControl>
              <Button onClick={submit} variant="contained">
                submit
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
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
    </div>
  );
};

export default StaffTransaction;
{
  /* <label>{`Customer : ${customer.name}`}</label>
            <br />
            <label htmlFor="account">Account :</label>
            <select
              id="account"
        value={form.accountNumber}
        onChange={(e) => {
          const v = e.currentTarget.value;
          setForm((s) => ({ ...s, accountNumber: v }));
          setFieldError((s) => ({
            ...s,
            accountNumber: "",
          }));
        }}
      >
        {accounts.map((ac) => (
          <option key={ac._id} value={ac.accountNumber}>
            {ac.accountNumber} {ac.accountType}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="amount">Amount :</label>
      <input
        type="text"
        id="amount"
        value={form.amount}
        onChange={(e) => {
          const v = e.currentTarget.value;
          setForm((s) => ({ ...s, amount: v }));
          setFieldError((s) => ({ ...s, amount: "" }));
        }}
      />
      <br />
      <label htmlFor="type">Withdraw / Deposit :</label>
      <select
        id="type"
        value={form.type}
        onChange={(e) => {
          const t = e.currentTarget.value;
          setForm((s) => ({
            ...s,
            type: t,
          }));
          setFieldError((s) => ({
            ...s,
            type: "",
          }));
        }}
      >
        <option value={"withdraw"}>Withdraw</option>
        <option value={"deposit"}>Deposit</option>
      </select>
      <br />
      <label htmlFor="desc">Desc :</label>
      <input
        type="text"
        id="desc"
        value={form.desc}
        onChange={(e) => {
          const d = e.currentTarget.value;
          setForm((s) => ({ ...s, desc: d }));
          setFieldError((s) => ({ ...s, desc: "" }));
        }}
      />
      <br />
      <button onClick={submit}>submit</button> */
}
