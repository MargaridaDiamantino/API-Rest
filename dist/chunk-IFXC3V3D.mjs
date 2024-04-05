import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-5KVQPZKD.mjs";

// src/routes/register-for-event.ts
import z from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendee", {
    schema: {
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({ attendeeId: z.number() })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const existingAttendee = await prisma.attendee.findUnique({
      where: {
        eventsId_email: {
          email,
          eventsId: eventId
        }
      }
    });
    if (existingAttendee != null) {
      throw new BadRequest(" This user register in event");
    }
    const [event, amoutOfAttendeesForEvent] = await Promise.all([
      prisma.events.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventsId: eventId
        }
      })
    ]);
    if (event?.maximumattendees && amoutOfAttendeesForEvent >= event.maximumattendees) {
      throw new BadRequest(`The event is full`);
    }
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventsId: eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  registerForEvent
};
