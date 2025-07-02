import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const resp = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              username: username,
            },
          }
        );
        setBalance(resp.data.balance); // assuming resp.data.User contains the array
      } catch (err) {
        console.error("Error fetching the users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance balance={balance} />
        <Users />
      </div>
    </div>
  );
}
