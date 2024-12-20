import { useState } from "react";

function Toggle() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div
      onClick={() => setIsToggled(!isToggled)}
      style={{
        width: "20px",
        height: "10px",
        borderRadius: "50px",
        backgroundColor: isToggled ? "blue" : "gray",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: '.3s ease',
        justifyContent: isToggled ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        
      </div>
    </div>
  );
}

export default Toggle;
