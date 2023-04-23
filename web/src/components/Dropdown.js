import { useState } from "react";
import { ReactComponent as Expand } from "../assets/expand.svg";

export default function Dropdown({
  className = "",
  width,
  menuMargin = "mt-3",
  value,
  setValue,
  menuItems,
}) {
  const [open, setOpen] = useState(false);

  const _menuItems = [...menuItems];
  const index = _menuItems.indexOf(value);
  if (index > -1) {
    _menuItems.splice(index, 1);
  }

  //bg-opacity-50 bg-gray-200 hover:bg-opacity-100 for menu item

  return (
    <div
      className={className}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // if focus left the entire thing including children
          setOpen(false);
        }
      }}
    >
      <button
        className={`z-10 p-1 px-2 text-sm flex items-center text-black hover:underline`}
        // ${
        //   open
        //     ? " bg-opacity-50 hover:bg-opacity-100"
        //     : " bg-opacity-0 hover:bg-opacity-50"
        // }
        // `}
        onClick={() => setOpen(!open)}
      >
        {value}
        <Expand className="ml-2 h-4 w-4" />
      </button>
      {open ? (
        <ul
          className={`z-10 rounded-lg overflow-hidden absolute ${menuMargin} ${width}`}
        >
          {_menuItems.map((item) => (
            <li key={_menuItems.indexOf(item)}>
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black text-sm text-left"
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                }}
              >
                <div className={`p-1 px-2 ${width}`}>{item}</div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
