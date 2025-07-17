import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
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

function TraAmount() {
  const [accounts, setAccounts] = useState([]);
  const { customerId } = useParams();
  const Auth = useContext(AuthContext);
  const [customer, setCustomer] = useState({});
  const [form, setForm] = useState({
    fromAcc: "",
    toAcc: "",
    amount: "",
  });

  const [fieldError, setFieldError] = useState({
    fromAcc: "",
    toAcc: "",
    amount: "",
  });

  const [errorTost, setErrorTost] = useState("");
  const token = Auth.checkIsLogin();

  const Transfer = async () => {
    try {
      // const payload = {
      //   fromAcc: form.fromAcc,
      //   toAcc: form.toAcc,
      //   amount: form.amount,
      // };
      const respose = await axios.post(
        "http://localhost:8888/api/v1/customer/transaction",
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (respose.status === 200) {
        const token = respose.data.token;
        Auth.checkIsLogin(token);
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
      const resp = await axios.get(
        "http://localhost:8888/api/v1/customer/accountLIst",
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
              height: 400,
            }}
          >
            <Stack spacing={3} sx={{ marginY: 4 }} width={400}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>From Account</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  variant="standard"
                  value={form.fromAcc}
                  label="From Account"
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((s) => ({ ...s, fromAcc: v }));
                    setFieldError((er) => ({ ...er, fromAcc: "" }));
                  }}
                  error={fieldError.fromAcc.length !== 0}
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
                {fieldError.fromAcc && (
                  <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                    {fieldError.fromAcc}
                  </p>
                )}
                <FormHelperText>from Account</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>To Account</InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={form.toAcc}
                  label="To Account"
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((s) => ({ ...s, toAcc: v }));
                    setFieldError((er) => ({ ...er, toAcc: "" }));
                  }}
                  error={fieldError.toAcc.length !== 0}
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
                {fieldError.toAcc && (
                  <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                    {fieldError.toAcc}
                  </p>
                )}
                <FormHelperText>To Account</FormHelperText>
                
                <TextField
                  label="Enter Amount You want To Transfer"
                  variant="standard"
                  type="number"
                  value={form.amount}
                  onChange={(e) => {
                    setForm((s) => ({ ...s, amount: e.target.value }));
                    setFieldError((er) => ({ ...er, amount: "" }));
                  }}
                  error={fieldError.amount.length !== 0}
                  helperText={fieldError.amount}
                />
              </FormControl>
              <Button onClick={Transfer} variant="contained">
                Transaction
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
}

export default TraAmount;
