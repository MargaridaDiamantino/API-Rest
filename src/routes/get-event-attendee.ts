import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { checkIn } from "./check-in";

export async function getEventAttendees(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get("/events/:eventsId/attendees", {
            schema: {
                summary: 'Get event attendees',
        tags: ['events'],
                params: z.object({
                    eventsId: z.string().uuid()
                }),
                querystring: z.object({
                    query: z.string().nullish(),
                    pageIndex: z.string().nullish().default('0').transform(Number)
                }),
                response:{
                    200:z.object({
                        attendees:z.array(
                            z.object({
                                id:z.number(),
                             name:z.string(),
                             email:z.string().email(),
                             createdAt:z.date(),
                             checkInAt:z.date().nullable()


                                
                            })
                        )
                    })
                }

            }
        }, async (request, reply) => {
            const { eventsId } = request.params
            const { pageIndex, query } = request.query;

            const attendees = await prisma.attendee.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    CheckIn: {
                        select: {
                            createdAt: true
                        }
                    }
                }, where: query ? {
                    eventsId,
                    name: {
                        contains: query
                    }

                }:{
                    eventsId
                },
                take: 10,
                skip: pageIndex * 10
            })

            return reply.send({
                attendees: attendees.map((attendee) =>{
                    return{
                        id:attendee.id,
                        name:attendee.name,
                        email:attendee.email,
                        createdAt:attendee.createdAt,
                        checkInAt:attendee.CheckIn?.createdAt??null
                    }

                })
            })
        })
}


