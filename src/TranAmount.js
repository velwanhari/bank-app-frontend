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

function TraAmount() {
  const [accounts, setAccounts] = useState([]);
  const Auth = useContext(AuthContext);

  const [form, setForm] = useState({
    fromAcc: "",
    toAcc: "",
  });

  const [fieldError, setFieldError] = useState({
    fromAcc: "",
    toAcc: "",
  });

  const [errorTost, setErrorTost] = useState("");
  const token = Auth.checkIsLogin();

  const Transfer = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/customer/transaction",
        form
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
      setErrorTost(message);

      const { errors } = data;
      const newErrorFiled = {};
      errors.forEach((errfield) => {
        const { msg, path } = errfield;
        newErrorFiled[path] = msg;
        setFieldError({ ...fieldError, ...newErrorFiled });
      });
    }
  };

  React.useEffect(() => {
    (async () => {
      const accounts = await axios.get(
        "http://localhost:8888/api/v1/customer/accountLIst",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(accounts);
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
                    setForm((s) => ({ ...s, fromAcc: e.target.value }));
                    setFieldError((er) => ({ ...er, fromAcc: "" }));
                  }}
                  error={fieldError.fromAcc.length !== 0}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={15930}>15930</MenuItem>
                  <MenuItem value={15930}>15930</MenuItem>
                  <MenuItem value={15930}>15930</MenuItem>
                </Select>
                {fieldError.type && (
                  <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                    {fieldError.type}
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
                    setForm((s) => ({ ...s, toAcc: e.target.value }));
                    setFieldError((er) => ({ ...er, toAcc: "" }));
                  }}
                  error={fieldError.toAcc.length !== 0}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={35902}>35902</MenuItem>
                  <MenuItem value={35902}>35902</MenuItem>
                  <MenuItem value={35902}>35902</MenuItem>
                </Select>
                {fieldError.type && (
                  <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                    {fieldError.type}
                  </p>
                )}
                <FormHelperText>To Account</FormHelperText>
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
