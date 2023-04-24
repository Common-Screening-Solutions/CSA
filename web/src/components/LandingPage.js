import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing.webm";
import sweatpants_woman from "../assets/sweatpants_woman.webm";
import studious from "../assets/studious.webm";

export default function LandingPage(props) {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/dashboard");
  }

  return (
    <div className="">
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="text-5xl text-center leading-relaxed cursor-default fade-in">
          Digital Health Screening <br />
          Done Right
        </div>
        <img
          src={landingImg}
          className="h-96 select-none fade-up opacity-0"
          draggable={false}
        />
        <div className="mt-9 w-40 fade-up-d opacity-0">
          <Button
            text={
              localStorage.getItem("email_LS") ? "Dashboard" : "Get Started"
            }
            onClick={getStarted}
            arrow={true}
          />
        </div>
      </div>

      <img
        className="absolute bottom-16 right-20 h-96 fade-right"
        src={sweatpants_woman}
      />

      <img
        className="absolute bottom-0 left-20 h-80 fade-left"
        src={studious}
      />
    </div>
  );
}
