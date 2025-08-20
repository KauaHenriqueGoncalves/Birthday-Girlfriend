package com.birthday.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PageBirthdayService {

    // Target Date
    private final LocalDateTime targetDate = LocalDateTime.of(2025, 8, 20, 0, 0);

    public String getPage() {
        LocalDateTime today = LocalDateTime.now();
        System.out.println(targetDate);
        System.out.println(today);
        if (targetDate.isBefore(today)) {
            return "redirect:templates/birthday.html";
        }
        else {
            return "redirect:templates/wait/waiting.html";
        }
    }

}
