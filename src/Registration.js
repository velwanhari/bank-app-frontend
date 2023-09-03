import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import AuthContext from "./helpers/Auth";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Reagistration() {
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pan: "",
    password: "",
  });

  const [fieldError, setFieldError] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pan: "",
    password: "",
    confromPassword: "",
  });

  const [errorTost, setErrorTost] = useState("");

  const submit = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/customer/register",
        form
      );
      if (respose.status === 200) {
        const token = respose.data.token;
        Auth.saveAuth("customer", token);
        navigate("/AccountList")
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
        // setFieldError((t) => ({ ...t, [path]: msg }));
      });
    }
  };
  return (
    <Container sx={{ marginTop: 10, height: "150vh" }}>
      <Typography variant="h3" component="h2" marginBottom={5}>
        Registration Page
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
            height: 700,
          }}
        >
          <Stack spacing={3} sx={{ marginY: 4 }} width={400}>
            <FormControl>
              <TextField
                value={form.name}
                onChange={(e) => {
                  setForm((s) => ({ ...s, name: e.target.value }));
                  setFieldError((er) => ({ ...er, name: "" }));
                }}
                label="Name"
                error={fieldError.name.length !== 0}
                helperText={fieldError.name}
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.phone}
                onChange={(e) => {
                  setForm((s) => ({ ...s, phone: e.target.value }));
                  setFieldError((er) => ({ ...er, phone: "" }));
                }}
                error={fieldError.phone.length !== 0}
                helperText={fieldError.phone}
                label="Phne Number"
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.email}
                onChange={(e) => {
                  setForm((s) => ({ ...s, email: e.target.value }));
                  setFieldError((er) => ({ ...er, email: "" }));
                }}
                error={fieldError.email.length !== 0}
                helperText={fieldError.email}
                label="Email"
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.address}
                onChange={(e) =>
                  setForm((s) => ({ ...s, address: e.target.value }))
                }
                error={fieldError.address.length !== 0}
                helperText={fieldError.address}
                label="Address"
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.password}
                onChange={(e) =>
                  setForm((s) => ({ ...s, password: e.target.value }))
                }
                error={fieldError.password.length !== 0}
                helperText={fieldError.password}
                label="Password"
                type="password"
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.confromPassword}
                onChange={(e) =>
                  setForm((s) => ({ ...s, confromPassword: e.target.value }))
                }
                error={fieldError.confromPassword.length !== 0}
                helperText={fieldError.confromPassword}
                label="Confirm Passward"
                type="password"
                variant="standard"
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                value={form.pan}
                onChange={(e) =>
                  setForm((s) => ({ ...s, pan: e.target.value }))
                }
                error={fieldError.pan.length !== 0}
                helperText={fieldError.pan}
                label="PAN Number"
                variant="standard"
              ></TextField>
            </FormControl>

            <Button onClick={submit} variant="contained">
              Register
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

export default Reagistration;
