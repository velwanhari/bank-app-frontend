import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./logout";
import Registration from "./Registration";
import CreateAccount from "./CreateAccount";
import TransactionList from "./TransactionList";
import TranAmount from "./TranAmount";
import AccountList from "./Accountlist";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import RequireCustomer from "./RequireCustomer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext, { Auth } from "./helpers/Auth";
import RequireStaff from "./RequireStaff";
import Customers from "./Customers";
import CustomerKyc from "./CustomerKyc";
import StaffTransaction from "./StaffTransaction";

export default function Home() {
  return (
    <AuthContext.Provider value={Auth}>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Box sx={{ height: "100vh" }}>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/register" element={<Registration />}></Route>
              <Route
                path="/customers"
                element={
                  <RequireStaff>
                    <Customers />
                  </RequireStaff>
                }
              ></Route>
              <Route
                path="/customer-kyc/:customerId"
                element={
                  <RequireStaff>
                    <CustomerKyc />
                  </RequireStaff>
                }
              ></Route>
               <Route
                path="/customer-transaction/:customerId"
                element={
                  <RequireStaff>
                    <StaffTransaction />
                  </RequireStaff>
                }
              ></Route>
              <Route
                path="/transact"
                element={
                  <RequireCustomer>
                    <TranAmount />
                  </RequireCustomer>
                }
              ></Route>
              <Route
                path="/create-account"
                element={
                  <RequireCustomer>
                    <CreateAccount />
                  </RequireCustomer>
                }
              ></Route>
              <Route
                path="/accounts"
                element={
                  <RequireCustomer>
                    <AccountList />
                  </RequireCustomer>
                }
              ></Route>
              <Route
                path="/transactions/:accountId"
                element={
                  <RequireCustomer>
                    <TransactionList />
                  </RequireCustomer>
                }
              ></Route>
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
