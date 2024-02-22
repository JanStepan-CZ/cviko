import React from "react";
import "./Toggler.css";

function Toggler({ active, onChoose }) {
  const handleClick = (event) => {
    onChoose(event.target.name);
  };

  return (
    <div className="page-toggler">
      <button
        className={`toggler-btn ${active === 1 ? "active" : ""}`}
        onClick={handleClick}
        name="ryby"
      >
        Seznam rybiček
      </button>
      <button
        className={`toggler-btn ${active === 2 ? "active" : ""}`}
        onClick={handleClick}
        name="akvarko"
      >
        Akvárium
      </button>
    </div>
  );
}

export default Toggler;
