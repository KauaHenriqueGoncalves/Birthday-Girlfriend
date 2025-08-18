package com.birthday.controller;

import com.birthday.service.PageBirthdayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageBirthdayController {

    @Autowired
    PageBirthdayService service;

    @GetMapping("/")
    public String index() {
        System.out.println(service.getPage());
        return service.getPage();
    }

}
