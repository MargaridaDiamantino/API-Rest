import {
  registerForEvent
} from "./chunk-IFXC3V3D.mjs";
import {
  errorHandler
} from "./chunk-DMHJR2ZG.mjs";
import {
  checkIn
} from "./chunk-UFAPOTI4.mjs";
import {
  creatEvent
} from "./chunk-2F6CEZOY.mjs";
import "./chunk-HA5TJVYM.mjs";
import {
  getAttendee
} from "./chunk-I7HUZVCQ.mjs";
import {
  getEventAttendees
} from "./chunk-OSNEH6P6.mjs";
import {
  getEvent
} from "./chunk-COZ6W47K.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-5KVQPZKD.mjs";

// src/server.ts
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(creatEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendee);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
