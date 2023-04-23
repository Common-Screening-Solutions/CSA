import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { ReactComponent as Account } from "../assets/account.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  const email = localStorage.getItem("email_LS");

  const location = useLocation();
  const mobile = location.pathname == "/form";
  const userHidden =
    location.pathname == "/login" || location.pathname == "/form";

  function signIn() {
    navigate("/login");
  }

  function logOut() {
    localStorage.removeItem("email_LS");
    localStorage.removeItem("password_LS");
    navigate("/");
  }

  function home() {
    navigate("/");
  }

  const user = email ? (
    <div className="flex gap-3 justify-between items-center">
      {localStorage.getItem("email_LS")}
      <Logout
        className="w-10 h-10 fill-gray-800 cursor-pointer hover:fill-black"
        onClick={logOut}
      />
    </div>
  ) : (
    <div
      className="flex gap-3 justify-between items-center hover:underline cursor-pointer"
      onClick={signIn}
    >
      Sign In
      <Account className="w-10 h-10 fill-gray-900" />
    </div>
  );

  return (
    <div className={`top-0 ${mobile ? "mx-4 my-5" : "mx-5 my-9"} select-none`}>
      <div className={`${mobile ? "h-14" : "h-20"} flex items-center relative`}>
        <Logo
          className={`${mobile ? "h-14 w-14" : "h-16 w-16"} cursor-pointer`}
          onClick={home}
        />
        {mobile ? null : (
          <div
            className="w-10 text-sm ml-4 text-black font-medium cursor-pointer"
            onClick={home}
          >
            Common Screening Solutions
          </div>
        )}
        {userHidden ? null : (
          <div className="absolute top-0 right-0">{user}</div>
        )}
      </div>
    </div>
  );
}
