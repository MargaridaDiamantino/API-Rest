import fastify from "fastify";
import {z} from "zod"

import { PrismaClient } from "@prisma/client";
const app =fastify()



 const prisma = new PrismaClient({log:['query']})
app.get("/", async()=>{return "hello"})
app.post("/events",async(request,reply)=>{
const creatEvents=z.object({
    title:z.string().min(4),
    details: z.string(),
    maximumattendees:z.number().int().positive(),
})
const data= creatEvents.parse(request.body)
const event= await prisma.events.create({
    data:{
        
       title:data.title,
       details:data.details,
       slug:new Date(Date.now()).toISOString()
    }})
    return reply.status(201).send({eventId:event.id})
})
    
  
app.listen({port:3333}).then(()=>{
    console.log("hello world")
})