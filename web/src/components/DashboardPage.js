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
    <div className="px-10">
      <div className="flex items-center justify-between w-full mb-20">
        <div className="text-5xl font-medium">Dashboard</div>
        {/* <div className="text-sm underline">Edit campaign</div> */}
      </div>
      <EmployeeList />
    </div>
  );
}

function EmployeeList(props) {
  const employees = generateEmployees();

  return (
    <div className="flex flex-col gap-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="basis-1/4 grow-0 font-bold text-xl">
          Employees - <span>{employees.length}</span>
        </div>
        <div className="basis-1/4 grow-0 text-sm">Email</div>
        <div className="basis-1/4 grow-0 text-sm">Phone</div>
        <div className="basis-1/12 grow-0 text-sm">Status</div>
      </div>
      {employees.map((e) => (
        <div className="flex items-center justify-between">
          <div className="basis-1/4 grow-0">
            <div className="flex gap-3 items-center font-bold">
              <Circle className="h-10" />
              {e.name}
            </div>
          </div>
          <div className="basis-1/4 grow-0 text-gray-500">{e.email}</div>
          <div className="basis-1/4 grow-0 text-gray-500">{e.phone}</div>
          <div className={"basis-1/12 grow-0 " + statuses[e.status]}>
            {e.status}
          </div>
        </div>
      ))}
    </div>
  );
}
