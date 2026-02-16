package dev.harrel;

import io.avaje.jex.Jex;
import io.avaje.jex.core.json.Jackson3JsonService;
import io.avaje.jex.staticcontent.StaticContent;

public class App {

    static void main() {
        StaticContent webRoot =
                StaticContent.ofClassPath("/web/index.html")
                        .route("/*")
                        .build();
        StaticContent webBundle =
                StaticContent.ofClassPath("/web")
                        .route("/*")
                        .directoryIndex("files.index")
                        .preCompress()
                        .putResponseHeader("Cache-Control", "max-age=86400")
                        .build();
        StaticContent robots =
                StaticContent.ofClassPath("/robots/robots.txt")
                        .route("/robots.txt")
                        .putMimeTypeMapping("txt", "application/javascript")
                        .build();

        Jex.create()
                .plugin(robots)
                .plugin(webBundle)
                .plugin(webRoot)
                .jsonService(new Jackson3JsonService())
                .get("/api/version", new VersionHandler())
                .post("/api/json-validate", new ValidationHandler())
                .port(8080)
                .start();
    }
}
