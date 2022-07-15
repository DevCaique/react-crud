import { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";

export function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => console.log("sucess"));
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) =>
      console.log(response)
    );
  };

  return (
    <Fragment>
      <div className="application">
        <label>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Position</label>
        <input
          type="text"
          name="position"
          id="position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <label>Wage (month)</label>
        <input
          type="number"
          name="wage"
          id="wage"
          onChange={(e) => setWage(e.target.value)}
        />
      </div>
      <button onClick={addEmployee}>Add employee</button>
      <button onClick={getEmployees}>Show Employees</button>
    </Fragment>
  );
}
