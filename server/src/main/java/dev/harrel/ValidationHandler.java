package dev.harrel;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class ValidationHandler implements Handler {
    @Override
    public void handle(Context ctx) throws Exception {
        System.out.println(ctx.body());
        ctx.result("[]");
    }
}
