package dev.harrel;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    public IndexController() {
        System.out.println("IndexController");
    }

    @GetMapping("/test")
    public String test() {
        return "index.html";
    }
}
