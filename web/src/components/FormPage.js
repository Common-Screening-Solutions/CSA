import Button from "./Button.js";
import InputField from "./InputField.js";
import { useState, useRef } from "react";
import { ReactComponent as Check } from "../assets/check.svg";

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
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const symptomCount = useRef(0);

  function submit() {
    setSubmitted(true);

    const body = JSON.stringify({
      name: name,
      pin: parseInt(code),
      status: symptomCount.current < 1 ? "no" : "yes",
    });

    fetch(
      "https://better-tables-wear-12-38-208-106.loca.lt/api/submit-screen-results",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      }
    );

    console.log(body);
  }

  function tryAuth() {
    setAuth(true);
  }

  if (submitted) {
    return (
      <Check className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fill-green-500" />
    );
  }

  return (
    <div className="m-5">
      <div className="text-4xl font-medium">Screening Form</div>
      <div className="mt-4 bg-slate-300 h-px w-screen absolute left-0"></div>
      {auth ? (
        <div className="mt-10 flex flex-col items-center">
          <div className="text-3xl font-bold mb-4">COVID-19</div>
          <div className="text-sm font-medium text-center mb-10">
            Have you experienced any of the following symptoms in the past 7
            days?
          </div>
          {symptoms.map((s) => (
            <div className="flex justify-between w-full font-medium text-md mb-4">
              {s}
              <input
                className="w-6"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    symptomCount.current += 1;
                  } else {
                    symptomCount.current -= 1;
                  }
                }}
              />
            </div>
          ))}
          <div className="w-3/4 absolute bottom-8">
            <Button text="Submit" onClick={submit} height="h-16" />
          </div>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center">
          <div className="w-48 mb-5">
            <InputField
              onInput={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
            />
          </div>
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
