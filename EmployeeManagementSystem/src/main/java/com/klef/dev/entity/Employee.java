package com.klef.dev.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_table")
public class Employee {
    @Id
    @Column(name = "emp_id")
    private int id;

    @Column(name = "emp_name", nullable = false, length = 50)
    private String name;

    @Column(name = "emp_gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "emp_department", nullable = false, length = 20)
    private String department;

    @Column(name = "emp_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "emp_contact", nullable = false, unique = true, length = 20)
    private String contact;

    @Column(name = "emp_salary", nullable = false)
    private double salary;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }
}
