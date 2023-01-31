import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";

// import "./Header.css";

export default function Header() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center  gap-x-5">
        <img
          src="/images/person.png"
          alt="Admin Profile"
          className="w-14 rounded-full  "
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-base">محمد جواد عبدی</h1>
          <h3 className="text-slate-800">برنامه نویس فرانت اند</h3>
        </div>
      </div>

      <div className="flex gap-x-5">
        <div
          className="bg-slate-300 rounded-2xl w-96	h-11 flex items-center justify-between "
          style={{
            padding: "0 0 0 5px",
            boxShadow: " rgba(149, 157, 165, 0.2) 0 8px 24px",
          }}
        >
          <input
            type="text"
            placeholder="جست و جو بکنید ..."
            className="outline-none border-none w-full text-sm "
            style={{ background: "unset", padding: " 10px 20px 10px 10px" }}
          />
          <button
            className="flex items-center  text-sm  w32 h-10 rounded-xl bg bg-blue-500 text-zinc-300"
            style={{ padding: " 3px 20px" }}
          >
            جست و جو
          </button>
        </div>

        <button
          className="p-2 flex items-center justify-center rounded-2xl bg-blue-500 text-zinc-300 w-10 h-10 "
          style={{ boxShadow: "rgba(149,157,165,0.8) 0 8px 24px" }}
        >
          <AiOutlineBell />
        </button>
        <button
          className="p-2 flex items-center justify-center rounded-2xl bg-blue-500 text-zinc-300 w-10 h-10 "
          style={{ boxShadow: "rgba(149,157,165,0.8) 0 8px 24px" }}
        >
          <BsBrightnessHigh />
        </button>
      </div>
    </div>
  );
}
