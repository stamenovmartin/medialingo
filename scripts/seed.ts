import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";
 import * as schema from "../db/schema";

 const sql = neon(process.env.DATABASE_URL!);
//@ts-ignore
 const db=drizzle(sql,{schema});
 const main=async()=>{
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challanges);
        await db.delete(schema.challangeOptions);
        await db.delete(schema.challangeProgress);
     
        
        await db.insert(schema.courses).values([
            {
                id:1,
                title:"Español",
                imageSrc:"/spain.svg",
            },
            {
                id:2,
                title:"Македонски",
                imageSrc:"/macedonia.svg",
            },
            {
                id:3,
                title:"Deutsch",
                imageSrc:"/germany.svg",
            },
            {
                id:4,
                title:"English",
                imageSrc:"/uk.svg",
            },
            {
                id:5,
                title:"Français",
                imageSrc:"/france.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id:1,
                courseId:1,
                title:"Тема 1",
                description:"Научи ги основите",
                ordder:1
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,// for unit 1
                order:1,
                title:"Лажни вести на социјални мрежи"
            },
            {
                id:2,
                unitId:1,// for unit 1
                order:2,
                title:"Сатира/Пародија"
            },
            {
                id:3,
                unitId:1,// for unit 1
                order:3,
                title:"Пропаганда"
            },
            {
                id:4,
                unitId:1,// for unit 1
                order:4,
                title:"Манипулирана содржина"
            },
            {
                id:5,
                unitId:1,// for unit 1
                order:5,
                title:"Лажни наслови"
            },
           
        ]);

        await db.insert(schema.challanges).values([
            {
                id:1,
                lessonId:1,//лажмни вести
                type:"SELECT",
                order:1,
                question:"Препознај кое од наведениве е лажна вест?",
            },
            
        ]);
        await db.insert(schema.challangeOptions).values([
            {
                id:1,
                challangeId:1,
                imageSrc:"/fakeNews3.svg",//ова е фејк, другите се точни
                correct:true,
                text:"Месото од Мекдоналдс е од црви",
            },
            {
                id:2,
                challangeId:1,
                imageSrc:"/fakeNews1.svg",
                correct:false,
                text:"Елон Маск го купи Твитер",
            },
            {
                id:3,
                challangeId:1,
                imageSrc:"/fakeNews2.svg",
                correct:false,
                text:"Македонија ќе игра на светско",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
 };
 main();
