import React from "react";

function Button({ label, onClick, color }) {
  return (
    <div className="flex">
      <button
        className={`p-1 flex justify-center items center ${color} rounded-md text-sm font-light`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
