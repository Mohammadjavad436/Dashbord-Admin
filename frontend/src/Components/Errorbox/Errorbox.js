import React from "react";

export default function ErrorBox({ msg }) {
  return (
    <div className="text-3xl bg-red-600 mt-5 p-5 text-yellow-50 text-center">
      <h1>{msg}</h1>
    </div>
  );
}
