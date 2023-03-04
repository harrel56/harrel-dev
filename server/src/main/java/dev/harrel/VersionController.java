package dev.harrel;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/version")
public class VersionController {

    private final String version;

    public VersionController(@Value("${TAG:unspecified}") String version) {
        this.version = version;
    }

    @GetMapping
    public String getVersion() {
        return version;
    }
}
