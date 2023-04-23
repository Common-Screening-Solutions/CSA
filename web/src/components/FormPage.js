import Button from "./Button.js";
import InputField from "./InputField.js";
import { useState } from "react";

const symptoms = [
  "Coughing",
  "Fever or chills",
  "Loss of taste or smell",
  "Shortness of breath",
  "Sore throat",
  "Fatigue",
];

export default function FormPage(props) {
  const [code, setCode] = useState("");
  const [auth, setAuth] = useState(false);

  function submit() {}

  function tryAuth() {
    setAuth(true);
  }

  return (
    <div className="m-5">
      <div className="text-4xl font-medium">Screening Form</div>
      <div className="mt-4 bg-slate-300 h-px w-screen absolute left-0"></div>
      {auth ? (
        <div className="mt-16 flex flex-col items-center">
          <div className="text-3xl font-bold mb-8">COVID-19</div>
          <div className="text-md font-medium text-center mb-10">
            Have you experienced any of the following symptoms in the past 7
            days?
          </div>
          {symptoms.map((s) => (
            <div className="flex justify-between w-full font-medium text-xl mb-6">
              {s}
              <input className="w-6" type="checkbox" />
            </div>
          ))}
          <div className="w-3/4 absolute bottom-8">
            <Button text="Submit" onClick={submit} height="h-16" />
          </div>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center">
          <div className="w-32">
            <InputField
              onInput={(e) => {
                setCode(e.target.value);
              }}
              placeholder="4-digit code"
              maxlength={4}
            />
          </div>
          <div className="w-3/4 absolute bottom-8">
            <Button text="Next" onClick={tryAuth} arrow={true} height="h-16" />
          </div>
        </div>
      )}
    </div>
  );
}
