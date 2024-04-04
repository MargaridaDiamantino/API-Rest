import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>()
        .post("/events/:eventId/attendee", {
            schema: {
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email()
                }),
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                response: {
                    201: z.object({ attendeeId: z.number() })
                }
            }
        }, async (request, reply) => {
            const { eventId } = request.params
            const { name, email } = request.body;

            const  existingAttendee = await prisma.attendee.findUnique({
                where:{
                    eventsId_email:{
                        email,eventsId:eventId
                    }
                    
                }
            })

            if(existingAttendee!=null){
                throw new Error(" This user register in event")
            }

       const [ event,amoutOfAttendeesForEvent ]=     await Promise.all([
                prisma.events.findUnique({
                    where:{
                        id:eventId
                    }
                }),
                prisma.attendee.count({
                    where:{
                        eventsId:eventId
                    }
                })
            ])
    
            if(event?.maximumattendees && amoutOfAttendeesForEvent>=event.maximumattendees){
               throw new Error(`The event is full`)
            }
            const attendee = await prisma.attendee.create({
                data:{
                    name,
                    email,
                    eventsId:eventId,
                }
                
            })
            return reply.status(201).send({attendeeId:attendee.id})
    })
}