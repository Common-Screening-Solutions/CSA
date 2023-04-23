import { ReactComponent as Right } from "../assets/right.svg";

export default function Button({
  text,
  onClick,
  arrow = false,
  height = "h-10",
}) {
  return (
    <div
      className={`${height} flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg shadow-lg select-none cursor-pointer`}
      onClick={onClick}
    >
      {text}
      {arrow ? <Right className="h-4 w-4 fill-current" /> : null}
    </div>
  );
}
