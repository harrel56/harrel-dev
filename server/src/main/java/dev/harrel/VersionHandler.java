package dev.harrel;

import io.avaje.jex.http.Context;
import io.avaje.jex.http.ExchangeHandler;

import java.io.InputStream;
import java.util.Optional;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

public class VersionHandler implements ExchangeHandler {
    private final VersionResponse versionResponse;

    public VersionHandler() {
        Attributes attributes = getManifestAttributes();
        String imageVersion = Optional.ofNullable(System.getenv("BUILD_VERSION"))
                .orElse("unknown");
        String jsonSchemaVersion = Optional.ofNullable(attributes.getValue("Json-Schema-Version"))
                .orElse("unknown");
        this.versionResponse = new VersionResponse(imageVersion, jsonSchemaVersion);
    }

    @Override
    public void handle(Context ctx) {
        ctx.json(versionResponse);
    }

    private Attributes getManifestAttributes() {
        try (InputStream is = App.class.getResourceAsStream("/META-INF/MANIFEST.MF")) {
            return new Manifest(is).getMainAttributes();
        } catch (Exception e) {
            return new Attributes();
        }
    }
}

record VersionResponse(String imageVersion, String jsonSchemaVersion) {}
