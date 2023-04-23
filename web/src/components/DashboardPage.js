import { faker } from "@faker-js/faker";
import { ReactComponent as Circle } from "../assets/circle.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Add } from "../assets/add.svg";

const statuses = {
  yes: ["text-red-500", "symptoms"],
  none: ["text-slate-400", "pending"],
  no: ["text-green-500", "okay"],
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

const apiUrl = `http://better-tables-wear-12-38-208-106.loca.lt/api/get-campaign-data?email=${localStorage.getItem("email_LS")}&ph=${localStorage.getItem("password_LS")}`;
const API_ROOT = "http://better-tables-wear-12-38-208-106.loca.lt/api/";

export default function DashboardPage(props) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("email_LS")){window.location.href="/login"}
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("HEHERE", data);
        // alert(1)
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  function createCampaign() {
    navigate("/create-campaign")
  }
  // }

  console.log(data)
  if (data == null) { return <div></div>}
  else if(data.error){
    return (
        <div className="mx-36 m-12">
          <div className="text-5xl font-medium mb-1">Dashboard</div>
          <div className="mx-1 mb-20 text-slate-700">No campaign found</div>
          <div className="flex justify-between items-center mb-6 px-3 py-5 mx-1 bg-slate-200 w-fit text-center rounded-md drop-shadow-lg cursor-pointer hover:scale-105 transition-all" onClick={createCampaign}>
            <Add/>Create a campaign
          </div>
        </div> 
    )
  } else {
    return (
      <div className="mx-36 m-12">
        <div className="text-5xl font-medium mb-20">Dashboard</div>
        <div className="flex justify-between items-center mb-6 px-3 mx-10 pr-[54px]">
          <div className="basis-1/4 grow-0 font-semibold text-xl">
            Employees - <span className="font-thin">{data.subjects.length}</span>
          </div>
          <div className="basis-1/4 grow-0 text-sm">Email</div>
          <div className="basis-1/4 grow-0 text-sm">Phone</div>
          <div className="basis-1/12 grow-0 text-sm">Status</div>
        </div>
        <EmployeeList data={data}/>
      </div>
    );
  }
}

function EmployeeList({data}) {
  const employees = data.subjects;
  // console.log(data)
  return (
    <div className="flex flex-col gap-0 m-10 max-h-[46vh] overflow-y-scroll overflow-x-hidden">
      {employees.map((e) => (
        <div className="flex items-center justify-between py-7 px-3 pr-12 rounded-l-2xl transition-all hover:bg-slate-100">
          <div className="basis-1/4 grow-0 select-none">
            <div className="flex gap-3 items-center font-bold">
              <Circle className="h-10" />
              {e.name}
            </div>
          </div>
          <div className="basis-1/4 grow-0 text-gray-500 select-none">
            {e.email}
          </div>
          <div className="basis-1/4 grow-0 text-gray-500 select-none">
            {e.phone_number}
          </div>
          <div
            className={"basis-1/12 grow-0 select-none " + statuses[e.screen_status][0]}
          >
            {statuses[e.screen_status][1]}
          </div>
        </div>
      ))}
    </div>
  );
}
