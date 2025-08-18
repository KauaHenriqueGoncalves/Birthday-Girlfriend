package com.birthday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BirthdayApplication {

    public static void main(String[] args) {
        SpringApplication.run(BirthdayApplication.class, args);
        System.out.println("URL: http://localhost:8080/");
    }

}
