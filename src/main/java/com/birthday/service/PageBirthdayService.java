package com.birthday.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PageBirthdayService {

    // Target Date
    private final LocalDate targetDate = LocalDate.of(2025, 8, 20);

    public String getPage() {
        LocalDate today = LocalDate.now();
        if (targetDate.isBefore(today)) {
            return "redirect:templates/birthday.html";
        }
        else {
            return "redirect:templates/wait/waiting.html";
        }
    }

}
