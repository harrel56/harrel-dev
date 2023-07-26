package dev.harrel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.harrel.jsonschema.*;
import dev.harrel.jsonschema.Error;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

public class ValidationHandler implements Handler {
    private static final Logger logger = LoggerFactory.getLogger(ValidationHandler.class);

    private final ObjectMapper mapper = new ObjectMapper()
            .addMixIn(Error.class, ErrorMixIn.class);
    private final ValidatorFactory factory = new ValidatorFactory();

    @Override
    public void handle(Context ctx) throws Exception {
        Instant startTime = Instant.now();
        String body = ctx.body();
        logger.info("Validation request: {}", body);
        JsonNode jsonNode = mapper.readTree(body);
        Response response;
        try {
            Validator.Result result = factory.validate(jsonNode.get("schema"), jsonNode.get("instance"));
            response = new Response(result.isValid(), result.getErrors(), null);
        } catch (InvalidSchemaException e) {
            response = new Response(false, e.getErrors(), "Schema failed validation against meta-schema");
            ctx.status(400);
        } catch (MetaSchemaResolvingException e) {
            response = new Response(false, null, e.getMessage());
            ctx.status(400);
        }
        String responseJson = mapper.writeValueAsString(response);
        ctx.result(responseJson);
        logger.info("Validation result: {}ms {}", Duration.between(startTime, Instant.now()).toMillis(), responseJson);
    }
}

record Response(boolean valid, List<Error> errors, String errorMessage) {}

interface ErrorMixIn {
    @JsonIgnore
    boolean isValid();

    @JsonIgnore
    Object getAnnotation();
}
