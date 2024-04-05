import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-5KVQPZKD.mjs";

// src/routes/get-event.ts
import z from "zod";
async function getEvent(app) {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "Get an event",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      })
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const event = await prisma.events.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumattendees: true,
        _count: {
          select: {
            Attendee: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (event === null) {
      throw new BadRequest("Event not found");
    }
    return reply.send({ event: {
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maximumAttendees: event.maximumattendees,
      attendessAmount: event._count.Attendee
    } });
  });
}

export {
  getEvent
};
