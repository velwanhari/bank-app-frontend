import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";


function Login() {
  return (
    <Container className="body" sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h2" marginBottom={5}>
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
            <FormControl sx={{
              '& MuiInput-input.':{
                margin:100
              }
            }}>
              <TextField
                label="Enter User name Here..."
                variant="standard"
                type="email"
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Enter Password Here..."
                variant="standard"
                type="password"
              />
            </FormControl>
            <Link component="button" variant="body2" underline="hover">
              forget Password?
            </Link>
            <Button variant="contained">Login</Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
