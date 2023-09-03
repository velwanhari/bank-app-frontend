import React, { useState,useContext } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import AuthContext from "./helpers/Auth";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    type: "",
  });
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
    type: "",
  });

  const [errorTost, setErrorTost] = useState("");

  const login = async () => {
    if (form.type === "customer") {
      await customerLogin();
    }
    if (form.type === "staff") {
      await staffLogin();
    }
    if (form.type === "admin") {
      await adminLogin();
    }
  };

  const customerLogin = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/login/customer",
        form
      );

      if (respose.status === 200) {
        const token = respose.data.token;
        Auth.saveAuth("customer", token);
        navigate("/transact");
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

  const staffLogin = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/login/staff",
        form
      );

      if (respose.status === 200) {
        const token = respose.data.token;
        Auth.saveAuth("staff", token);
        navigate("/customers");
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

  const adminLogin = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/login/admin",
        form
      );

      if (respose.status === 200) {
        const token = respose.data.token;
        Auth.saveAuth("admin", token);
        navigate("/admin");
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
    <Container className="body" sx={{ marginTop: 10 }}>
      <Typography
        variant="h3"
        textAlign={"center"}
        component="h2"
        marginBottom={5}
      >
        Login Page
      </Typography>
      <Box
        sx={{
          marginY: 1,
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
            height: 500,
          }}
        >
          <Stack spacing={2} sx={{ marginY: 4 }} width={400}>
            <FormControl
              sx={{
                "& MuiInput-input.": {
                  margin: 100,
                },
              }}
            >
              <TextField
                label="Enter User name Here..."
                variant="standard"
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm((s) => ({ ...s, email: e.target.value }));
                  setFieldError((er) => ({ ...er, email: "" }));
                }}
                error={fieldError.email.length !== 0}
                helperText={fieldError.email}
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Enter Password Here..."
                variant="standard"
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm((s) => ({ ...s, password: e.target.value }));
                  setFieldError((er) => ({ ...er, password: "" }));
                }}
                error={fieldError.password.length !== 0}
                helperText={fieldError.password}
              />
            </FormControl>

            <FormControl>
              <InputLabel>Select Type</InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Type"
                variant="standard"
                value={form.type}
                onChange={(e) => {
                  setForm((s) => ({ ...s, type: e.target.value }));
                  setFieldError((er) => ({ ...er, type: "" }));
                }}
                error={fieldError.type.length !== 0}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
              {fieldError.type && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root">
                  {fieldError.type}
                </p>
              )}
            </FormControl>
            <Button onClick={login} variant="contained">
              Login
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

export default Login;
