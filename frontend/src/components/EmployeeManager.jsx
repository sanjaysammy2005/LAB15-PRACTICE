import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import './style.css';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    gender: '',
    department: '',
    email: '',
    contact: '',
    salary: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedEmployee, setFetchedEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/employeeapi`;

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setEmployees(res.data);
    } catch {
      setMessage('⚠️ Failed to fetch employees.');
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in employee) {
      if (!employee[key]) {
        setMessage(`Please fill out ${key}`);
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, employee);
      setMessage('✅ Employee added successfully.');
      fetchAllEmployees();
      resetForm();
    } catch {
      setMessage('❌ Error adding employee.');
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, employee);
      setMessage('✅ Employee updated successfully.');
      fetchAllEmployees();
      resetForm();
    } catch {
      setMessage('❌ Error updating employee.');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('🗑️ Employee deleted.');
      fetchAllEmployees();
    } catch {
      setMessage('❌ Error deleting employee.');
    }
  };

  const getEmployeeById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedEmployee(res.data);
      setMessage('');
    } catch {
      setFetchedEmployee(null);
      setMessage('Employee not found.');
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditMode(true);
  };

  const resetForm = () => {
    setEmployee({
      id: '',
      name: '',
      gender: '',
      department: '',
      email: '',
      contact: '',
      salary: ''
    });
    setEditMode(false);
  };

  return (
    <div className="main-container">
      <header className="navbar">
        <h1>Employee Manager</h1>
        <nav>
          <a href="#add">Add / Edit</a>
          <a href="#fetch">Fetch by ID</a>
          <a href="#all">All Employees</a>
        </nav>
      </header>

      <div className="content-box">
        {message && <div className="msg-box">{message}</div>}

        <section id="add" className="section-box">
          <h2>{editMode ? 'Edit Employee' : 'Add Employee'}</h2>
          <div className="form-grid">
            <input type="number" name="id" value={employee.id} onChange={handleChange} placeholder="ID" />
            <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" />
            <select name="gender" value={employee.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
            <input type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Department" />
            <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="contact" value={employee.contact} onChange={handleChange} placeholder="Contact" />
            <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" />
          </div>

          <div className="btn-group">
            {!editMode ? (
              <button className="btn add" onClick={addEmployee}>Add</button>
            ) : (
              <>
                <button className="btn update" onClick={updateEmployee}>Update</button>
                <button className="btn cancel" onClick={resetForm}>Cancel</button>
              </>
            )}
          </div>
        </section>

        <section id="fetch" className="section-box">
          <h2>Fetch Employee by ID</h2>
          <div className="fetch-box">
            <input
              type="number"
              value={idToFetch}
              onChange={(e) => setIdToFetch(e.target.value)}
              placeholder="Enter Employee ID"
            />
            <button className="btn fetch" onClick={getEmployeeById}>Fetch</button>
          </div>
          {fetchedEmployee && (
            <div className="fetched-box">
              <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>
            </div>
          )}
        </section>

        <section id="all" className="section-box">
          <h2>All Employees</h2>
          <table className="employee-table">
            <thead>
              <tr>
                {Object.keys(employee).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  {Object.keys(employee).map((key) => (
                    <td key={key}>{emp[key]}</td>
                  ))}
                  <td className="action-td">
                    <button className="btn small edit" onClick={() => handleEdit(emp)}>Edit</button>
                    <button className="btn small delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default EmployeeManager;
