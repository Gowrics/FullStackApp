import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    manager: "",
    salary: "",
  });
  const [showCancel, setShowCancel] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const columns = [
    { name: "Employee ID", selector: (row) => row.employeeId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Manager", selector: (row) => row.manager, sortable: true },
    { name: "Salary", selector: (row) => row.salary, sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdate(row)}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row)}
        >
          Delete
        </button>
      ),
    },
  ];

  const getAllEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8082/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleUpdate = (emp) => {
    setEmployeeData(emp);
    setShowCancel(true);
  };

  const handleDelete = async (emp) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8082/employees/${emp.employeeId}`);
        getAllEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeData.name || !employeeData.manager || !employeeData.salary) {
      setErrMsg("All fields are required!");
      return;
    }

    try {
      if (employeeData.employeeId) {
        await axios.patch(
          `http://localhost:8082/employees/${employeeData.employeeId}`,
          employeeData
        );
      } else {
        await axios.post("http://localhost:8082/employees", employeeData);
      }
      clearAll();
      getAllEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleCancel = () => {
    clearAll();
  };

  const clearAll = () => {
    setEmployeeData({ name: "", manager: "", salary: "" });
    setShowCancel(false);
    setErrMsg("");
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    setErrMsg("");
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center">Employee Management</h3>
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="manager">Manager</label>
            <input
              type="text"
              className="form-control"
              id="manager"
              name="manager"
              value={employeeData.manager}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="salary"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-2">
            {employeeData.employeeId ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={!showCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      <DataTable
        columns={columns}
        data={employees}
        pagination
        highlightOnHover
        fixedHeader
      />
    </div>
  );
}

export default EmployeeManagement;
