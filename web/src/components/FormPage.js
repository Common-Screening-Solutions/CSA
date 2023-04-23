import Button from "./Button.js";

const symptoms = [
  "Coughing",
  "Fever or chills",
  "Loss of taste or smell",
  "Shortness of breath",
  "Sore throat",
  "Fatigue",
];

export default function FormPage(props) {
  return (
    <div className="m-5">
      <div className="text-4xl font-medium">Screening Form</div>
      <div className="mt-4 bg-slate-300 h-px w-screen absolute left-0"></div>
      <div className="mt-16 flex flex-col items-center">
        <div className="text-3xl font-bold mb-8">COVID-19</div>
        <div className="text-md font-medium text-center mb-10">
          Have you experienced any of the following symptoms in the past 7 days?
        </div>
        {symptoms.map((s) => (
          <div className="flex justify-between w-full font-medium text-xl mb-6">
            {s}
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </div>
  );
}
