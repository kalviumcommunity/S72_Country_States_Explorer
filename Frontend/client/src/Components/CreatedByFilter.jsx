import React, { useEffect, useState } from "react";

function CreatedByFilter() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetch(`/cities/by-user/${selectedUserId}`)
        .then((res) => res.json())
        .then(setCities);
    } else {
      setCities([]);
    }
  }, [selectedUserId]);

  return (
    <div>
      <label>Select User:</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Select --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div>
        <h3>Cities created by selected user:</h3>
        <ul>
          {cities.map((city) => (
            <li key={city._id}>
              {city.name} ({city.country}) – Pop: {city.population}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreatedByFilter;
