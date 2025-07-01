import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your Credentials to Sign in"} />
          <InputBox
            label={"Email"}
            placeholder={"bhavit@gmail.com"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"1456743dsm@"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            label={"Sign In"}
            onClick={async () => {
              const resp = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username: username,
                  password: password,
                }
              );
              if (resp.data.token && resp.data.username) {
                localStorage.setItem("username", username),
                  localStorage.setItem("token", resp.data.token);
                navigate(`/dashboard?username=${username}`);
              }
            }}
          />
          <BottomWarning
            label={"Don't have an account?"}
            ButtonText={"Signup"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
