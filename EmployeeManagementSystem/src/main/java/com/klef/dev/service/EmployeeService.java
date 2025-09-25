package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Employee;

public interface EmployeeService {
    Employee addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);
    Employee updateEmployee(Employee employee);
    void deleteEmployeeById(int id);
}
