import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Account } from "../assets/account.svg";

export default function Navbar({ signedIn = true, userHidden = false }) {
  return (
    <div className="top-0 mx-5 my-9 select-none">
      <div className="h-20 flex items-center relative">
        <Logo className="h-16" />
        <div className="w-10 text-sm ml-1 text-black font-medium">
          Common Screening Solutions
        </div>
        {userHidden ? null : (
          <div className="flex gap-3 absolute top-0 right-0 justify-between items-center hover:underline cursor-pointer">
            {signedIn ? "John Doe" : "Sign In"}
            <Account className="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
