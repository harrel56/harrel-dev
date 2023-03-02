package dev.harrel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    public TestController() {
        System.out.println("hi");
    }

    @GetMapping("/test")
    public String test() {
        return "CICD testing";
    }
}
