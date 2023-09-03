import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./helpers/Auth";

const StaffTransaction = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
    type: "",
    desc: "",
  });
  const [fieldError, setFieldError] = useState({
    accountNumber: "",
    amount: "",
    type: "",
    desc: "",
  });
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

  const submit = async () => {
    try {
      const payload = {
        customerId: customer._id.toString(),
        accountNumber: form.accountNumber,
        amount: form.amount,
        type: form.type === "withdraw" ? "debit" : "credit",
        desc: form.desc,
      };
      const resp = await axios.post(
        "http://localhost:8888/api/v1/staff/customer/transaction",
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resp.status === 200) {
        navigate("/customers");
      }
    } catch (error) {
      // const { // copy from login code
      //     response: { data },
      //     message,
      //   } = error;
      //   if (typeof data == "string") {
      //     setErrorTost(data);
      //   } else {
      //     setErrorTost(message);
      //     const { errors } = data;
      //     const newErrorFiled = {};
      //     errors.forEach((errfield) => {
      //       const { msg, path } = errfield;
      //       newErrorFiled[path] = msg;
      //       setFieldError({ ...fieldError, ...newErrorFiled });
      //     });
      //   }
    }
  };

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

        const resp = await axios.post(
          "http://localhost:8888/api/v1/staff/accountLIst",
          {
            id: customerId,
          },
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
      } catch (error) {}
    })();
  }, []);
  return (
    <React.Fragment>
      <label>{`Customer : ${customer.name}`}</label>
      <br />
      <label htmlFor="account">Account :</label>
      <select
        id="account"
        value={form.accountNumber}
        onChange={(e) => {
          const v = e.currentTarget.value;
          setForm((s) => ({ ...s, accountNumber: v }));
          setFieldError((s) => ({
            ...s,
            accountNumber: "",
          }));
        }}
      >
        {accounts.map((ac) => (
          <option key={ac._id} value={ac.accountNumber}>
            {ac.accountNumber} {ac.accountType}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="amount">Amount :</label>
      <input
        type="text"
        id="amount"
        value={form.amount}
        onChange={(e) => {
          const v = e.currentTarget.value;
          setForm((s) => ({ ...s, amount: v }));
          setFieldError((s) => ({ ...s, amount: "" }));
        }}
      />
      <br />
      <label htmlFor="type">Withdraw / Deposit :</label>
      <select
        id="type"
        value={form.type}
        onChange={(e) => {
          const t = e.currentTarget.value;
          setForm((s) => ({
            ...s,
            type: t,
          }));
          setFieldError((s) => ({
            ...s,
            type: "",
          }));
        }}
      >
        <option value={"withdraw"}>Withdraw</option>
        <option value={"deposit"}>Deposit</option>
      </select>
      <br />
      <label htmlFor="desc">Desc :</label>
      <input
        type="text"
        id="desc"
        value={form.desc}
        onChange={(e) => {
          const d = e.currentTarget.value;
          setForm((s) => ({ ...s, desc: d }));
          setFieldError((s) => ({ ...s, desc: "" }));
        }}
      />
      <br />
      <button onClick={submit}>submit</button>
    </React.Fragment>
  );
};

export default StaffTransaction;
