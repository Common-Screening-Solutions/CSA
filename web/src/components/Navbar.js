import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { ReactComponent as Account } from "../assets/account.svg";
import { useLocation } from "react-router-dom";

export default function Navbar(props) {
  const signedIn = localStorage.getItem("email_LS");

  const location = useLocation();
  const mobile = location.pathname == "/form";
  const userHidden = location.pathname == "/login";

  return (
    <div className={`top-0 ${mobile ? "mx-4 my-5" : "mx-5 my-9"} select-none`}>
      <div className={`${mobile ? "h-14" : "h-20"} flex items-center relative`}>
        <Logo className={mobile ? "h-14 w-14" : "h-16 w-16"} />
        {mobile ? null : (
          <div className="w-10 text-sm ml-4 text-black font-medium">
            Common Screening Solutions
          </div>
        )}
        {userHidden ? null : (
          <div className="flex gap-3 absolute top-0 right-0 justify-between items-center hover:underline cursor-pointer">
            {signedIn ? <div><Logout/>{localStorage.getItem("email_LS")}</div> : "Sign In"}
            <Account className="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
