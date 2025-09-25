package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class EmployeeManagementSystemApplication extends SpringBootServletInitializer {
	

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementSystemApplication.class, args);
		System.out.println("Hello backend Running");
	}

}
