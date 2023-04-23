import landingImg from "../assets/landing.png";
import Button from "./Button.js";

export default function LandingPage(props) {
  function getStarted() {
    window.location.href = "/dashboard"
  }

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="text-5xl text-center leading-relaxed cursor-default">
        Digital Health Screening <br />
        Done Right
      </div>
      <img src={landingImg} className="h-96 select-none fade-up opacity-0" draggable={false} />
      <div className="mt-9 w-40 fade-up-d opacity-0">
        <Button text="Get Started" to="/dashboard" arrow={true} />
      </div>
    </div>
  );
}
