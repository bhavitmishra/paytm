import axios from "axios";
import Heading from "../components/Heading";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const name =
    searchParams.get("firstname") + " " + searchParams.get("lastname");
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center">
          <Heading label={"Send Money"} />

          <div className="pt-6  px-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
              {name[0]}
            </div>
            <div className="font-semibold ml-4 text-2xl text-left">{name}</div>
          </div>
          <div className="text-left px-6 pb-4 font-semibold text-sm">
            Amount (in Rs)
          </div>
          <div className="px-6 pb-6">
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="text"
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
            />
          </div>
          <div className="px-6 pb-10">
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={async () => {
                await axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    username: localStorage.getItem("username"),
                    amount: amount,
                    to: id,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                navigate("/success");
              }}
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
