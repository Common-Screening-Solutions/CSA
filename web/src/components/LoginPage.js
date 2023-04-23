import InputField from "./InputField.js";
import { ReactComponent as Right } from "../assets/right.svg";
import { useRef } from "react";

export default function LoginPage(props) {
  const email = useRef("");
  const password = useRef("");

  function login() {}

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
      <button
        className="flex items-center justify-center gap-2 mt-20 bg-gray-900 text-white rounded-lg h-10 w-32 shadow-lg"
        onClick={login}
      >
        Continue <Right className="h-4 w-4 fill-current" />
      </button>
    </div>
  );
}
