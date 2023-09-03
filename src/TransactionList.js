import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import AuthContext from "./helpers/Auth";

const TransactionList = () => {
  const { accountId } = useParams();
  const Auth = React.useContext(AuthContext);
  const token = Auth.checkIsLogin();

  React.useEffect(() => {
    (async () => {
      try {
        const respose = await axios.get(
          `http://localhost:8888/api/v1/customer/transactions/${accountId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (respose.status === 200) {
          const { list } = respose.data;
          console.log(list);
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
  return <React.Fragment>{accountId}</React.Fragment>;
};

export default TransactionList;
