import { Prisma } from "@prisma/client";
import {prisma} from "../src/lib/prisma.ts" 
async function seed() {
    await prisma.events.create({
        data:{
            id:"9e9bc979-9d18-4915-b339-3786b1634f33",
            title:"UnitE-sumit",
            slug: 'unite-sumit',
            details:"um eento para devs apaixonados(as) por codigo",
            maximumattendees:120
        }
    })
    
}
seed().then(()=>{
    console.log("Database seeded")
    prisma.$disconnect()
})