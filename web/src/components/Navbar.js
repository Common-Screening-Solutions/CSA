import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Circle } from "../assets/circle.svg";

export default function Navbar(props) {
  return (
    <div className="mx-5 my-9">
      <div className="h-20 flex items-center relative">
        <Logo className="h-16" />
        <div className="w-10 text-sm ml-1 text-black font-medium">
          Common Screening Solutions
        </div>
        <div className="flex gap-3 absolute top-0 right-0 justify-between items-center">
          John Doe {<Circle className="h-10 w-10" />}
        </div>
      </div>
    </div>
  );
}
