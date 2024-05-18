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
            {
                id:2,
                lessonId:1,//лажна вест од пријател
                type:"ASSIST",
                order:2,
                question:"За време на час по историја, твој соученик ти вели дека еден познат историски настан никогаш не се случил и дека бил измислен од власта. Што треба да направиш за да утврдиш дали информацијата е точна.",
            },
            {
                id:3,
                lessonId:1,//лажмни вести
                type:"SELECT",
                order:3,
                question:"Прочитај го извадокот од таблоид за веста која е докажана научно и одлучи дали е:",
            },
            
        ]);
        await db.insert(schema.challangeOptions).values([
            {
                challangeId:1,
                imageSrc:"/fakeNews3.svg",//ова е фејк, другите се точни
                correct:true,
                text:"Месото од Мекдоналдс е од црви",
            },
            {
                challangeId:1,
                imageSrc:"/fakeNews1.svg",
                correct:false,
                text:"Елон Маск го купи Твитер",
            },
            {
                challangeId:1,
                imageSrc:"/fakeNews2.svg",
                correct:false,
                text:"Македонија ќе игра на светско",
            },
        ]);
        await db.insert(schema.challangeOptions).values([
            {
                challangeId:2,
                //ова е фејк, другите се точни
                correct:false,
                text:"Да го прифатиш аргуменотот бидејќи кажан е од твој близок пријател.",
            },
            {
                challangeId:2,
                correct:true,
                text:"Да ја истражиш темата користејќи историски ресурси и вебстрани.",
            },
            {
                challangeId:2,
                correct:false,
                text:"да ја споделиш информацијата на социјални мрежи и да видиш што мислат другите.",
            },
        ]);
        await db.insert(schema.challangeOptions).values([
            {
                challangeId:3,
                imageSrc:"/coffeeNews.png",//ова е фејк, другите се точни
                correct:false,
                text:"Точно",
            },
            {
                challangeId:3,
                imageSrc:"/coffeeNews.png",
                correct:false,
                text:"Неточно",
            },
            {
                challangeId:3,
                imageSrc:"/coffeeNews.png",
                correct:true,
                text:"Не може да се утврди.",
            },
        ]);
        await db.insert(schema.challanges).values([
            {
                id:4,
                lessonId:2,//лажмни вести
                type:"SELECT",
                order:1,
                question:"Препознај кое од наведениве е лажна вест?",
            },
            {
                id:5,
                lessonId:2,//лажна вест од пријател
                type:"ASSIST",
                order:2,
                question:"За време на час по историја, твој соученик ти вели дека еден познат историски настан никогаш не се случил и дека бил измислен од власта. Што треба да направиш за да утврдиш дали информацијата е точна.",
            },
            {
                id:6,
                lessonId:2,//лажмни вести
                type:"SELECT",
                order:3,
                question:"Прочитај го извадокот од таблоид за веста која е докажана научно и одлучи дали е:",
            },
            
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
 };
 main();
