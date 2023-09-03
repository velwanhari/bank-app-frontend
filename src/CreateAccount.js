import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import AuthContext from "./helpers/Auth";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [account, setAccount] = React.useState("");
  const [errorTost, setErrorTost] = React.useState("");
  const [fieldError, setFieldError] = React.useState({ accountType: "" });
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

  const handleChange = (event) => {
    setAccount(event.target.value);
    setFieldError({accountType : ""});
  };

  const submitCreateAccount = async () => {
    console.log(account);
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/account/create",
        {
          accountType: account,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (respose.status === 200) {
        navigate("/accounts");
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

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h2" marginBottom={5}>
        Create Account
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
            width: "90%",
            sx: "auto",
            height: 400,
          }}
        >
          <Stack spacing={3} sx={{ marginY: 10 }} width={400}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Account Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account}
                label="Select Account Type"
                onChange={handleChange}
                error={fieldError.accountType.length !== 0}
              >
                <MenuItem value={"saving"}>Saving</MenuItem>
                <MenuItem value={"current"}>Current</MenuItem>
                <MenuItem value={"fd"}>FD</MenuItem>
              </Select>
              {fieldError.accountType && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                  {fieldError.accountType}
                </p>
              )}
            </FormControl>
            <Button onClick={submitCreateAccount} variant="contained">
              Create
            </Button>
          </Stack>
        </Paper>
      </Box>
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
    </Container>
  );
}

// const getAsync = function () {
//   return new Promise((res,rej)=>{
//     try {
//       setTimeout(() => {
//         res("sucess");
//       },3000);
//     } catch (error) {
//       rej(error)
//     }
//   })
// };

// getAsync().then(x => {
//   console.log(x) // "success"
// }).catch(er => {

// })
