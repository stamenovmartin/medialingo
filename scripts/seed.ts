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
           
        ]);

        await db.insert(schema.challanges).values([
            {
                id:1,
                lessonId:1,//лажмни вести
                type:"SELECT",
                order:1,
                question:"Препознај кое од наведениве е лажна вес?",
            },
            
        ]);
        await db.insert(schema.challangeOptions).values([
            {
                id:1,
                challangeId:1,
                imageSrc:"fakeNews3.png",//ова е фејк, другите се точни
                correct:true,
                text:"",
            },
            {
                id:2,
                challangeId:1,
                imageSrc:"fakeNews1.png",
                correct:false,
                text:"",
            },
            {
                id:3,
                challangeId:1,
                imageSrc:"fakeNews2.png",
                correct:false,
                text:"",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
 };
 main();
