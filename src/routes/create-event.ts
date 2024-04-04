import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { generateSlug } from "../util/generateSlug";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export async function creatEvent(app:FastifyInstance){
app.withTypeProvider<ZodTypeProvider>().post("/events", {
    schema: {
        body: z.object({
            title: z.string().min(4),
            details: z.string(),
            maximumattendees: z.number().int().positive(),
        }),
        response:{201:z.object({
            eventId: z.string().uuid(),
        })}
    }
}, async (request, reply) => {


    const { details, maximumattendees, title } = (request.body)
    const slug = generateSlug(title)

    const eventExists = await prisma.events.findUnique({ where: { slug } })
    if (eventExists !== null) {
        throw new Error("error em criar o slug");
    }
    const event = await prisma.events.create({
        data: {

            title,
            details,
            maximumattendees,
            slug
        }
    })
    return reply.status(201).send({ eventId: event.id })
})


}