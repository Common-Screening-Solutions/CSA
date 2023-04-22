import { faker } from "@faker-js/faker";
import { ReactComponent as Circle } from "../assets/circle.svg";

const statuses = {
  ok: "text-green-500",
  pending: "text-yellow-400",
  symptoms: "text-red-700",
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
    <div>
      <div className="flex items-center justify-between w-full mb-14">
        <div className="text-5xl font-medium">Dashboard</div>
        <div className="text-sm underline">Edit campaign</div>
      </div>
      <EmployeeList />
    </div>
  );
}

function EmployeeList(props) {
  const employees = generateEmployees();

  return (
    <div className="flex flex-col mx-auto w-11/12">
      <div className="flex justify-between mb-10">
        <div className="basis-1/4 grow-0">Employees</div>
        <div className="basis-1/4 grow-0">Email</div>
        <div className="basis-1/4 grow-0">Phone</div>
        <div className="basis-1/12 grow-0">Status</div>
      </div>
      {employees.map((e) => (
        <div className="flex h-14 items-center justify-between">
          <div className="basis-1/4 grow-0">
            <div className="flex gap-3 items-center">
              <Circle className="h-10" />
              {e.name}
            </div>
          </div>
          <div className="basis-1/4 grow-0">{e.email}</div>
          <div className="basis-1/4 grow-0">{e.phone}</div>
          <div className={"basis-1/12 grow-0 " + statuses[e.status]}>
            {e.status}
          </div>
        </div>
      ))}
    </div>
  );
}
