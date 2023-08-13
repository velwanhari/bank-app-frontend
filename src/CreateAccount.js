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

export default function CreateAccount() {
  const [account, setAccount] = React.useState("");

  const handleChange = (event) => {
    setAccount(event.target.value);
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
              >
                <MenuItem value={10}>Saving</MenuItem>
                <MenuItem value={20}>Current</MenuItem>
                <MenuItem value={30}>FD</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained">Create</Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
