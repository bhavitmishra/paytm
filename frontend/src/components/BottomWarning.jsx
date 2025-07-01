import { Link } from "react-router-dom";
export default function BottomWarning({ label, to, ButtonText }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {ButtonText}
      </Link>
    </div>
  );
}
