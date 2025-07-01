import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

export default function TransactionSuccess() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center">
          <Heading label={"Transaction Success"} />
          <SubHeading
            label={`Money was successfully Transferred from ${localStorage.getItem(
              "username"
            )}'s account to ${localStorage.getItem("recievername")}'s account`}
          />
          <Button
            label={"Return to DashBoard"}
            onClick={() => {
              localStorage.removeItem("recievername");
              navigate(
                `/dashboard?username=${localStorage.getItem("username")}`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
