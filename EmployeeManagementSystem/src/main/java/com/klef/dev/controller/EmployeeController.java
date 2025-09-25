package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.entity.Employee;
import com.klef.dev.service.EmployeeService;

@RestController
@RequestMapping("/employeeapi/")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public String home() {
        return "Employee Management System - Jenkins Deployment Demo";
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee saved = employeeService.addEmployee(employee);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable int id) {
        Employee emp = employeeService.getEmployeeById(id);
        if (emp != null) return new ResponseEntity<>(emp, HttpStatus.OK);
        else return new ResponseEntity<>("Employee not found.", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee employee) {
        Employee existing = employeeService.getEmployeeById(employee.getId());
        if (existing != null) {
            return new ResponseEntity<>(employeeService.updateEmployee(employee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        Employee existing = employeeService.getEmployeeById(id);
        if (existing != null) {
            employeeService.deleteEmployeeById(id);
            return new ResponseEntity<>("Employee deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee not found.", HttpStatus.NOT_FOUND);
        }
    }
}
