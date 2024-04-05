import fastify from "fastify";
import { z } from "zod"
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, ZodTypeProvider,jsonSchemaTransform } from "fastify-type-provider-zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./util/generateSlug";
import { error } from "console";
import { creatEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendee } from "./routes/get-attendees-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendee";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { errorHandler } from "./error-hadle";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})


app.register(fastifySwagger, {
    swagger: {
      consumes: ['application/json'],
      produces: ['application/json'],
      info: {
        title: 'pass.in',
        description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
        version: '1.0.0'
      },
    },
    transform: jsonSchemaTransform,
  })
  
  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(creatEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendee)

app.register(checkIn)

app.register(getEventAttendees)

app.setErrorHandler(errorHandler)
app.listen({ port: 3333,host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running!')
})