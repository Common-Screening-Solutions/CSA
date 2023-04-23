import landingImg from "../assets/landing.png";
import Button from "./Button.js";

export default function LandingPage(props) {
  function getStarted() {}

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="text-5xl text-center leading-relaxed cursor-default">
        Digital Health Screening <br />
        Done Right
      </div>
      <img src={landingImg} className="h-96 select-none" draggable={false} />
      <div className="mt-6 w-40">
        <Button text="Get Started" onClick={getStarted} arrow={true} />
      </div>
    </div>
  );
}
