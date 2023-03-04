package dev.harrel;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {

    private final String version;

    public IndexController(@Value("${TAG:unspecified}") String version) {
        this.version = version;
    }

    @GetMapping
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("index");
        mav.addObject("version", version);
        return mav;
    }
}
