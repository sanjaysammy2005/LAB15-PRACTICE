package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findByEmail(String email);
    Employee findByContact(String contact);
}
