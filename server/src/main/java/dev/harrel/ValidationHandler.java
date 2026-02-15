package dev.harrel;

import dev.harrel.json.providers.jackson3.Jackson3Node;
import dev.harrel.jsonschema.*;
import dev.harrel.jsonschema.Error;
import io.avaje.jex.http.Context;
import io.avaje.jex.http.ExchangeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;

public class ValidationHandler implements ExchangeHandler {
    private static final Logger logger = LoggerFactory.getLogger(ValidationHandler.class);

    private final JsonNodeFactory nodeFactory = new Jackson3Node.Factory();
    private final ValidatorFactory defaultValidatorFactory = new ValidatorFactory()
            .withJsonNodeFactory(nodeFactory)
            .withEvaluatorFactory(new FormatEvaluatorFactory());
    private final Map<String, ValidatorFactory> validatorFactories = Map.of(
            SpecificationVersion.DRAFT2020_12.getId(), defaultValidatorFactory,
            SpecificationVersion.DRAFT2019_09.getId(), new ValidatorFactory()
                    .withJsonNodeFactory(nodeFactory)
                    .withEvaluatorFactory(new FormatEvaluatorFactory())
                    .withDefaultDialect(new Dialects.Draft2019Dialect()),
            SpecificationVersion.DRAFT7.getId(), new ValidatorFactory()
                    .withJsonNodeFactory(nodeFactory)
                    .withEvaluatorFactory(new FormatEvaluatorFactory())
                    .withDefaultDialect(new Dialects.Draft7Dialect()),
            SpecificationVersion.DRAFT6.getId(), new ValidatorFactory()
                    .withJsonNodeFactory(nodeFactory)
                    .withEvaluatorFactory(new FormatEvaluatorFactory())
                    .withDefaultDialect(new Dialects.Draft6Dialect()),
            SpecificationVersion.DRAFT4.getId(), new ValidatorFactory()
                    .withJsonNodeFactory(nodeFactory)
                    .withEvaluatorFactory(new FormatEvaluatorFactory())
                    .withDefaultDialect(new Dialects.Draft4Dialect())
    );

    @Override
    public void handle(Context ctx) {
        Instant startTime = Instant.now();
        String body = ctx.body();
        logger.info("Validation request: {}", body);
        Map<String, JsonNode> jsonNode = nodeFactory.create(body).asObject();
        var validatorFactory = validatorFactories.getOrDefault(jsonNode.get("dialect").asString(), defaultValidatorFactory);
        Response response;
        try {
            Validator.Result result = validatorFactory.validate(jsonNode.get("schema"), jsonNode.get("instance"));
            response = new Response(result.isValid(), result.getErrors(), null);
        } catch (InvalidSchemaException e) {
            response = new Response(false, e.getErrors(), "Schema failed validation against meta-schema");
            ctx.status(400);
        } catch (MetaSchemaResolvingException e) {
            response = new Response(false, List.of(), e.getMessage());
            ctx.status(400);
        }
        String responseJson = ctx.jsonService().toJsonString(response);
        ctx.write(responseJson);
        logger.info("Validation result: {}ms {}", Duration.between(startTime, Instant.now()).toMillis(), responseJson);
    }
}

record Response(boolean valid, List<Error> errors, String errorMessage) {}
