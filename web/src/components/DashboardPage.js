import { faker } from "@faker-js/faker";
import { ReactComponent as Circle } from "../assets/circle.svg";

const statuses = {
  ok: "text-green-500",
  pending: "text-slate-400",
  symptoms: "text-red-500",
};

const generateEmployees = () => {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.name.fullName();
    employees.push({
      name: name,
      email: `${name.split(" ").join(".").toLowerCase()}@gmail.com`,
      phone: faker.phone.number("###-###-####"),
      status: faker.helpers.arrayElement(Object.keys(statuses)),
    });
  }

  return employees;
};



export default function DashboardPage(props) {
  return (
    <div className="mx-36">
      <div className="text-5xl font-medium mb-20">Dashboard</div>
      <EmployeeList/>
    </div>
  );
}

function EmployeeList(props) {
  const employees = generateEmployees();

  // if(!localStorage.getItem("email_LS")) {
  //   window.location.href = "/login"
  // } else if (process.env.api.REACT_APP_API_ROUTE) {

  // }

  return (
    <div className="flex flex-col gap-0 m-10">
      <div className="flex justify-between items-center mb-6 px-3">
        <div className="basis-1/4 grow-0 font-semibold text-xl">
          Employees - <span className="font-thin">{employees.length}</span>
        </div>
        <div className="basis-1/4 grow-0 text-sm">Email</div>
        <div className="basis-1/4 grow-0 text-sm">Phone</div>
        <div className="basis-1/12 grow-0 text-sm">Status</div>
      </div>
      {employees.map((e) => (
        <div className="flex items-center justify-between py-7 px-3 rounded-2xl transition-all hover:bg-slate-200">
          <div className="basis-1/4 grow-0 select-none">
            <div className="flex gap-3 items-center font-bold">
              <Circle className="h-10" />
              {e.name}
            </div>
          </div>
          <div className="basis-1/4 grow-0 text-gray-500 select-none">{e.email}</div>
          <div className="basis-1/4 grow-0 text-gray-500 select-none">{e.phone}</div>
          <div className={"basis-1/12 grow-0 select-none " + statuses[e.status]}>
            {e.status}
          </div>
        </div>
      ))}
    </div>
  );
}
