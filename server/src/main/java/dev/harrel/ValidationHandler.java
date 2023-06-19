package dev.harrel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.harrel.jsonschema.Error;
import dev.harrel.jsonschema.Validator;
import dev.harrel.jsonschema.ValidatorFactory;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.Instant;

public class ValidationHandler implements Handler {
    private static final Logger logger = LoggerFactory.getLogger(ValidationHandler.class);

    private final ObjectMapper mapper = new ObjectMapper()
            .addMixIn(Error.class, ErrorMixIn.class);
    private final ValidatorFactory factory = new ValidatorFactory()
            .withDefaultMetaSchemaUri(null);

    @Override
    public void handle(Context ctx) throws Exception {
        Instant startTime = Instant.now();
        String body = ctx.body();
        logger.info("Validation request: {}", body);
        JsonNode jsonNode = mapper.readTree(body);
        Validator.Result result = factory.validate(jsonNode.get("schema"), jsonNode.get("instance"));
        String errorsJson = mapper.writeValueAsString(result.getErrors());
        ctx.result(errorsJson);
        logger.info("Validation result: {}ms {}", Duration.between(startTime, Instant.now()).toMillis(), errorsJson);
    }
}

interface ErrorMixIn {
    @JsonIgnore
    boolean isValid();

    @JsonIgnore
    Object getAnnotation();
}
