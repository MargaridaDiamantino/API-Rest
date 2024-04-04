import fastify from "fastify";
import { z } from "zod"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./util/generateSlug";
import { error } from "console";
import { creatEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
const app = fastify()


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(creatEvent)
app.register(registerForEvent)
app.listen({ port: 3333 }).then(() => {
    console.log("hello world")
})