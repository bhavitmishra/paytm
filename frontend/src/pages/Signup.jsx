import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center">
          <Heading label={"Sign Up"} />
          <SubHeading
            label={"Enter your information to Sign In to your account"}
          />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"bhavit@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <Button
            onClick={async (e) => {
              e.preventDefault();
              try {
                const resp = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );

                console.log("SIGNUP RESPONSE:", resp.data);

                // Make sure the response actually contains these fields
                const token = resp.data.token;
                const returnedUsername = resp.data.username;
                if (token && returnedUsername) {
                  navigate(`/dashboard?username=${returnedUsername}`);
                }
                // Save them to localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("username", returnedUsername);
              } catch (error) {
                console.error("Signup error:", error);
              }
            }}
            label={"Sign Up"}
          />

          <BottomWarning
            label={"Already have an account?"}
            to={"/signin"}
            ButtonText={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
}
