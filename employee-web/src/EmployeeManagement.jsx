import React, { useState } from "react";
import { useTable } from "react-table";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const column = React.useMemo(
    () => [
      { Header: "EmployeeId", accessor: "employeeId" },
      { Header: "Name", accessor: "name" },
      { Header: "Manager", accessor: "manager" },
      { Header: "salary", accessor: "salary" },
    ],
    []
  );
  const data = React.useMemo(() => employees, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ column, data: employees });

  return (
    <div>
      <div className="container  main-container">
        <h1>Employee Service</h1>
        <div className="container add-panel bg-secondary border">
          <div className="row mb-3 mt-2 ">
            <div className="col-auto">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
              />
            </div>
            <div className="col-auto">
              <label htmlFor="manager" className="form-label">
                Manager:
              </label>
              <input
                type="text"
                className="form-control"
                id="manager"
                name="manager"
                placeholder="Enter manager"
              />
            </div>
            <div className="col-auto">
              <label htmlFor="salary" className="form-label">
                Salary:
              </label>
              <input
                type="text"
                className="form-control"
                id="salary"
                name="salary"
                placeholder="Enter salary"
              />
            </div>
            <div className="col-auto">
              <br />
              <button type="button" className="btn btn-primary mt-2 ">
                add
              </button>{" "}
              <button type="button" className="btn btn-primary mt-2 ">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <input
          type="search"
          className="searchinput mt-3"
          name="inputsearch"
          id="inputsearch"
          placeholder="Search Employee here..."
        ></input>
      </div>
      <div>
        <table
          className="table mt-5 table-dark table-striped"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()} key={hg.id}>
                {hg.headers.map((column) => (
                  <th {...column.getHeaderGroupProps()} key={column.id}>
                    {column.render}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th>Employee Name</th>
              <th>Manager Name</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
