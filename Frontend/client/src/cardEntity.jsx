import React from "react";

const EntityCard = ({ entity }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white max-w-sm">
      <h2 className="text-xl font-bold mb-2">{entity.name}</h2>
      <p className="text-gray-600">{entity.description}</p>
      <span className="text-sm text-gray-500">ID: {entity.id}</span>
    </div>
  );
};

// Dummy Data
const dummyEntity = {
  id: "12345",
  name: "Sample Entity",
  description: "This is a dummy entity for testing purposes."
};

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <EntityCard entity={dummyEntity} />
    </div>
  );
};

export default App;
