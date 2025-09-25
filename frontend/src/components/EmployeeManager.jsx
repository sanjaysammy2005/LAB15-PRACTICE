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
      setMessage('Failed to fetch employees.');
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
      setMessage('Employee added successfully.');
      fetchAllEmployees();
      resetForm();
    } catch {
      setMessage('Error adding employee.');
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, employee);
      setMessage('Employee updated successfully.');
      fetchAllEmployees();
      resetForm();
    } catch {
      setMessage('Error updating employee.');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllEmployees();
    } catch {
      setMessage('Error deleting employee.');
    }
  };

  const getEmployeeById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedEmployee(res.data);
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
    <div className="employee-container">
      <h2>Employee Management System</h2>
      {message && <div className="banner">{message}</div>}

      <h3>{editMode ? 'Edit Employee' : 'Add Employee'}</h3>
      <div className="form-grid">
        <input type="number" name="id" value={employee.id} onChange={handleChange} placeholder="ID" />
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" />
        <select name="gender" value={employee.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Department" />
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="contact" value={employee.contact} onChange={handleChange} placeholder="Contact" />
        <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" />
      </div>

      {!editMode ? (
        <button onClick={addEmployee}>Add Employee</button>
      ) : (
        <>
          <button onClick={updateEmployee}>Update Employee</button>
          <button onClick={resetForm}>Cancel</button>
        </>
      )}

      <h3>Get Employee by ID</h3>
      <input type="number" value={idToFetch} onChange={(e) => setIdToFetch(e.target.value)} />
      <button onClick={getEmployeeById}>Fetch</button>
      {fetchedEmployee && <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>}

      <h3>All Employees</h3>
      <table>
        <thead>
          <tr>
            {Object.keys(employee).map((key) => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              {Object.keys(employee).map((key) => <td key={key}>{emp[key]}</td>)}
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManager;
