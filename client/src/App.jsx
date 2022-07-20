// Imports
import { Fragment, useState } from "react";
import Axios from "Axios";

// Styles
import "./App.css";

export function App() {
  const [employeeList, setEmployeeList] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const addEmployee = () => {
    if (
      name.length <= 0 ||
      age <= 18 ||
      country.length <= 0 ||
      position.length <= 0 ||
      wage <= 0
    )
      return alert("Sem dados o suficiente");
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) =>
      setEmployeeList(response.data)
    );
  };

  const updateWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <Fragment>
      <div className="application">
        <div className="input__area">
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
        <div className="button__area">
          <button onClick={addEmployee}>Add employee</button>
          <button onClick={getEmployees}>Show Employees</button>
        </div>
        {employeeList.map((val, key) => {
          return (
            <div key={val.id}>
              <ul className="employee">
                <li>{val.name}</li>
                <li>{val.age}</li>
                <li>{val.country}</li>
                <li>{val.position}</li>
                <li>{val.wage}</li>
              </ul>
              <div>
                <input
                  type="text"
                  name="newWage"
                  id="newWage"
                  placeholder="New wage"
                  onChange={(e) => setNewWage(e.target.value)}
                />
                <button
                  onClick={() => {
                    updateWage(val.id);
                  }}
                >
                  Update Wage
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
