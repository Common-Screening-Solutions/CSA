import InputField from "./InputField.js";
import Button from "./Button.js";
import { useRef } from "react";

export default function LoginPage(props) {
  const email = useRef("");
  const password = useRef("");

  function login() {
    localStorage.setItem("email_LS", email.current);
    localStorage.setItem("password_LS", password.current);
    window.location.href = "/dashboard";
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="text-5xl mb-14">Start Screening</div>
      <div className="w-full mb-4">
        <InputField
          placeholder="email"
          onInput={(e) => {
            email.current = e.target.value;
          }}
        />
      </div>
      <div className="w-full">
        <InputField
          placeholder="password"
          type="password"
          onInput={(e) => {
            password.current = e.target.value;
          }}
        />
      </div>
      <div className="mt-20 w-32">
        <Button text="Continue" onClick={login} arrow={true} />
      </div>
    </div>
  );
}
