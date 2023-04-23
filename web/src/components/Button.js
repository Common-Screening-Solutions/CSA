import { ReactComponent as Right } from "../assets/right.svg";
import {Link} from "react-router-dom";

export default function Button({ text, onClick=null, to, arrow = false }) {
  return (
    <Link
      className="h-10 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg shadow-lg select-none cursor-pointer"
      onClick={onClick}
      to={to}
    >
      {text}
      {arrow ? <Right className="h-4 w-4 fill-current" /> : null}
    </Link>
  );
}
