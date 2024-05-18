import {cache} from "react"
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
    units,
    courses,
    userProgress,
    challangeProgress,
    lessons,
    challanges,
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
            if(
              lesson.challanges.length ===0
            ){
             return {...lesson,completed: false};
            }
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

export const getCourseProgress = cache(async ()=>{
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
       orderBy: (units, {asc}) => [asc(units.ordder)],
       where:  eq(units.courseId,userProgress.activeCourseId),
       with: {
        lessons: {
            orderBy: (lessons, {asc}) => [asc(lessons.order)],
            with : {
                unit: true,
                challanges: {
                    with: {
                        challangeProgress: {
                            where: eq(challangeProgress.userId,userId),
                        },

                    },
                },
            },
        },
       },
    });
    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson)=>{
        //TODO IF SMTH
        return lesson.challanges.some((challange) => {
            return !challange.challangeProgress || challange.challangeProgress.length ===0 || challange.challangeProgress.some((progress) =>
            progress.completed === false);
        });
    });
    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    };
});

export const getLesson = cache(async(id?:number) => {
    const {userId} = await auth();

    if (!userId) {
        return null;
    }
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if(!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challanges: {
                orderBy: (challanges, {asc}) => [asc(challanges.order)],
                with: {
                    challangeOptions: true,
                    challangeProgress: {
                      where: eq(challangeProgress.userId, userId),  
                    },
                },
            },
        },
    });

    if (!data || !data.challanges) {
        return null;
    }

    const normalizedChallenges = data.challanges.map((challenge) =>{
        //TODO IF SMTH
        const completed = challenge.challangeProgress  && challenge.challangeProgress.length>0 && challenge.challangeProgress.every((progress)=> progress.completed);

        return {
            ...challenge,completed}
    });
    return { ...data, challanges: normalizedChallenges}
});

export const getLessonPercentage = cache(async()=>{
const courseProgress = await getCourseProgress();

if(!courseProgress?.activeLessonId ){
    return 0;
}

const lesson = await getLesson(courseProgress.activeLessonId);

if(!lesson){
    return 0;
}

const completedChallenges = lesson.challanges.filter((challange) => challange.completed);
const percentage = Math.round((completedChallenges.length/lesson.challanges.length)*100,);

return percentage;

});