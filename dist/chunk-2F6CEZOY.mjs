import {
  generateSlug
} from "./chunk-HA5TJVYM.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-5KVQPZKD.mjs";

// src/routes/create-event.ts
import z from "zod";
async function creatEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string(),
        maximumattendees: z.number().int().positive()
      }),
      response: { 201: z.object({
        eventId: z.string().uuid()
      }) }
    }
  }, async (request, reply) => {
    const { details, maximumattendees, title } = request.body;
    const slug = generateSlug(title);
    const eventExists = await prisma.events.findUnique({ where: { slug } });
    if (eventExists !== null) {
      throw new BadRequest("error em criar o slug");
    }
    const event = await prisma.events.create({
      data: {
        title,
        details,
        maximumattendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  creatEvent
};
