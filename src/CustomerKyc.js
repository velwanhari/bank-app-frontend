import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./helpers/Auth";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";

const CustomerKyc = () => {
    const navigate = useNavigate();
  const { customerId } = useParams();
  const [customer, setCustomer] = React.useState({});
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

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

  const handleSubmit = async () => {
    try {
      const respose = await axios.post(
        "http://localhost:8888/api/v1/staff/customerKyc",
        {
          customerId: customerId,
          kyc: customer.kyc,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (respose.status === 200) {
        navigate("/customers")
      }
    } catch (error) {}
  };

  const handleKyc = (e) => {
    const newStatus = e.currentTarget.checked;
    setCustomer((c) => {
      return { ...c, kyc: newStatus ? "true" : "false" };
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h2" marginBottom={5}>
        Update Customer KYC
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
            padding: "1rem",
          }}
        >
          <Stack>
            <label htmlFor="chkCustomerKyc">
              {`Customer : ${customer.name}`}
            </label>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="chkCustomerKyc"
                    checked={customer.kyc === "true"}
                    onChange={handleKyc}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Set customer KYC status"
              />
            </FormGroup>
            <Button onClick={handleSubmit} variant="contained">
              submit
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};
export default CustomerKyc;
