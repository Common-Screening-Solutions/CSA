import { useState } from "react";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import Dropdown from "./Dropdown.js";

export default function CreateCampaignPage(props) {
  const [employees, setEmployees] = useState([]);
  const [interval, setInterval] = useState("Daily");
  const [intervalDay, setIntervalDay] = useState("Monday");

  function newEmployee() {
    const newEmployees = [...employees];
    newEmployees.push({ email: "", phone: "" });
    setEmployees(newEmployees);
  }

  function deleteEmployee(i) {
    const newEmployees = [...employees];
    newEmployees.splice(i, 1);
    setEmployees(newEmployees);
  }

  function onFieldChange(i, field, value) {
    const newEmployees = [...employees];
    newEmployees[i][field] = value;
    setEmployees(newEmployees);
  }

  function submit() {}

  const IntervalButton = ({ text }) => (
    <div
      className={`h-8 w-1/2 flex items-center justify-center text-sm ${
        interval === text ? "bg-gray-900 text-white" : "text-gray-900"
      }`}
      onClick={() => {
        setInterval(text);
      }}
    >
      {text}
    </div>
  );

  return (
    <div className="mx-36">
      <div className="text-5xl mb-10">Create Campaign</div>
      <div className="flex items-center mb-5">
        <div className="text-xl font-bold">Employees</div>
        <div className="ml-6 underline text-xs text-gray-500">
          Or import from excel...
        </div>
      </div>
      <div className="flex flex-col gap-5 mb-12">
        {employees.map((e, i) => (
          <div className="flex items-center gap-4">
            <div className="w-6">{i + 1}</div>
            <div className="flex items-center h-8 px-3 basis-1/3 rounded-lg bg-gray-200 text-gray-800">
              <input
                className="outline-none text-sm w-full bg-transparent"
                type="text"
                placeholder="example@gmail.com"
                onInput={(e) => {
                  onFieldChange(i, "email", e.target.value);
                }}
              />
            </div>
            <div className="flex items-center h-8 px-3 basis-1/6 rounded-lg bg-gray-200 text-gray-800">
              <input
                className="outline-none text-sm w-full bg-transparent"
                type="text"
                placeholder="###-###-####"
                onInput={(e) => {
                  onFieldChange(i, "phone", e.target.value);
                }}
              />
            </div>
            <Delete className="h-6" onClick={() => deleteEmployee(i)} />
          </div>
        ))}
        <div
          className="ml-6 flex gap-1 items-center text-sm"
          onClick={newEmployee}
        >
          <Add className="h-6" />
          New
        </div>
      </div>
      <div className="text-xl font-bold mb-5">Screening Interval</div>
      <div className="flex items-center">
        <div className="flex rounded-lg overflow-hidden w-48 border-2 border-current text-gray-900">
          <IntervalButton text="Daily" />
          <IntervalButton text="Weekly" />
        </div>
        <div className="ml-8 text-gray-600 text-sm">Every:</div>
        <Dropdown
          width="w-30"
          value={intervalDay}
          setValue={setIntervalDay}
          menuItems={[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ]}
        />
      </div>
      <button className="absolute mt-10" onClick={submit}>
        submit
      </button>
    </div>
  );
}
