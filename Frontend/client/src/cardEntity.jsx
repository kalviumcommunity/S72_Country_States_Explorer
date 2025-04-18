import React from "react";
import StateCard from "./Components/StateCard";

const cardEntity = () => {
  return (
    <div style={{ backgroundColor: "#231650", padding: "20px" }}>
      <StateCard 
        name="California"
        country="USA"
        population={39538223}
        capital="Sacramento"
      />
    </div>
  );
};

export default cardEntity;
