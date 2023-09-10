package dev.harrel;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

import java.io.InputStream;
import java.util.jar.Manifest;

public class VersionHandler implements Handler {
    private final String imageVersion;
    private final String jsonSchemaVersion;

    public VersionHandler() {
        this.imageVersion = System.getenv().getOrDefault("TAG", "unknown");
        this.jsonSchemaVersion = getJsonSchemaVersion();
    }

    @Override
    public void handle(@NotNull Context ctx) {
        ctx.json(new VersionResponse(imageVersion, jsonSchemaVersion));
    }

    private String getJsonSchemaVersion() {
        try (InputStream is = App.class.getResourceAsStream("META-INF/MANIFEST.MF")) {
            var attributes = new Manifest(is).getMainAttributes();
            return attributes.getValue("Json-Schema-Version");
        } catch (Exception e) {
            return "unknown";
        }
    }
}

record VersionResponse(String imageVersion, String JsonSchemaVersion) {}
