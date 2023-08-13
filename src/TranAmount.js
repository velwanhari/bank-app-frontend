import * as React from "react";
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

export default function TraAmount() {
  const [account, setAccount] = React.useState("");
  const[toAccount,setToAccount]=React.useState("");

  // const handlechange=(event)=>{
  //   setToAccount(event.target.value);    
  // }

  return (
    <div>
      <Container sx={{ marginTop: 10 }}>
        <Typography variant="h3" component="h2" marginBottom={5}>
          Amount Transaction Page
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
                <InputLabel id="demo-simple-select-helper-label">
                  From Account
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={account}
                  label="From Account"
                  onChange={(e)=>setAccount(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>15930</MenuItem>
                  <MenuItem value={10}>15930</MenuItem>
                  <MenuItem value={30}>15930</MenuItem>
                </Select>
                <FormHelperText>from Account</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">To Account</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={toAccount}
                  label="To Account"
                  onChange={(e)=>setToAccount(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>35902</MenuItem>
                  <MenuItem value={20}>35902</MenuItem>
                  <MenuItem value={30}>35902</MenuItem>
                </Select>
                <FormHelperText>To Account</FormHelperText>
              </FormControl>
              <Button variant="contained">Transaction</Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
