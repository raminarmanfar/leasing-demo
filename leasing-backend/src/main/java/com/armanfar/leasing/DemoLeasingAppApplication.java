package com.armanfar.leasing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoLeasingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoLeasingAppApplication.class, args);

		System.out.println("Leasing API server started...");
	}

}
