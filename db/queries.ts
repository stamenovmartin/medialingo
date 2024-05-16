import {cache} from "react"
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
    units,
    courses,
    userProgress,
    challangeProgress,
} from "@/db/schema";

export const getUserProgress = cache(async () =>{ 
const {userId} = await auth();

if(!userId){
    return null;
}

const data = await db.query.userProgress.findFirst({
 where: eq(userProgress.userId,userId),
 with: {
    activeCourse: true,
 },
});
return data;
});


export const getCourses = cache(async()=> {
 const data = await db.query.courses.findMany();

 return data;
});
export const getUnits=cache(async()=>{
    const {userId}=await auth();
    const userProgress=await getUserProgress();
    if(!userId||!userProgress?.activeCourseId){
        return [];
    }
    const data=await db.query.units.findMany({
        where:eq(units.courseId,userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challanges:{
                       with:{
                        challangeProgress:{
                            where: eq(challangeProgress.userId,
                                userId,
                            ),
                            
                            
                        }
                       },
                    },
                },
            },
        },
    });
    
    const normalizedData=data.map((unit)=>{
        const lessonsWithCompletedStatus=unit.lessons.map((lesson)=>{
            const allCompletedChallanges=lesson.challanges.every((challange)=>{
                return challange.challangeProgress
                && challange.challangeProgress.length>0
                && challange.challangeProgress.every((progress)=>progress.completed);
            });
            return {...lesson,completed:allCompletedChallanges};
        });
        return {...unit,lessons:lessonsWithCompletedStatus};
    });
    return normalizedData;
    
})

export const getCourseById = cache(async(courseId: number) =>{
    const data = await db.query.courses.findFirst({
        where: eq(courses.id,courseId),
        //TODO populate units and lessons
    });
    return data;
});