import landingImg from "../assets/landing.png";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom";

export default function LandingPage(props) {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/dashboard");
  }

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="text-5xl text-center leading-relaxed cursor-default">
        Digital Health Screening <br />
        Done Right
      </div>
      <img
        src={landingImg}
        className="h-96 select-none fade-up opacity-0"
        draggable={false}
      />
      <div className="mt-9 w-40 fade-up-d opacity-0">
        <Button text="Get Started" onClick={getStarted} arrow={true} />
      </div>
    </div>
  );
}
