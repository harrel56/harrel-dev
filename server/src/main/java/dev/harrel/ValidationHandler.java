package dev.harrel;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.harrel.jsonschema.Validator;
import dev.harrel.jsonschema.ValidatorFactory;
import io.javalin.http.Context;
import io.javalin.http.Handler;

public class ValidationHandler implements Handler {

    private final ObjectMapper mapper = new ObjectMapper();
    private final ValidatorFactory factory = new ValidatorFactory();

    @Override
    public void handle(Context ctx) throws Exception {
        JsonNode node = mapper.readValue(ctx.bodyInputStream(), JsonNode.class);
        Validator.Result result = factory.validate(node.get("schema"), node.get("instance"));
        ctx.result(mapper.writeValueAsString(result.getErrors()));
    }
}
