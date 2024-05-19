"use server";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challangeProgress, userProgress ,challanges} from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {eq,and} from 'drizzle-orm';
import { error } from "console";
import { POINTS_TO_REFILL } from "@/constants";
//const POINTS_TO_REFILL=10;

export const upsertUserProgress = async (courseId: number) =>{
    const {userId} = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }




    if (!course.units.length || !course.units[0].lessons.length)
        {
            throw new Error("Course is empty");
        }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId : courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}
export const reduceHearts=async(challangeId:number)=>{
    const {userId}=await auth();
    if (!userId){
        throw new Error("Unauthorized");
    }
    const currentUserProgress=await getUserProgress();

    const challange=await db.query.challanges.findFirst({
        where:eq(challanges.id,challangeId)
    });

    if(!challange){
        throw new Error("Challange not found!");
    }
    const lessonId=challange.lessonId;

    const existingChallangeProgress=await db.query.challangeProgress.findFirst({
        where:and(
            eq(challangeProgress.userId,userId),
            eq(challangeProgress.challangeId,challangeId)
        ),
    });
    const isPractice=!!existingChallangeProgress;

    if(isPractice){
        return{error:"practice"};
    }
    if(!currentUserProgress){
        throw new Error("User progress not found");
    }

    if(currentUserProgress.hearts===0){
        return{error:"hearts"};
    }

    await db.update(userProgress).set({
        hearts:Math.max(currentUserProgress.hearts-1,0),
    }).where(eq(userProgress.userId,userId));

    revalidatePath("/store");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/leaderboard/${lessonId}`);

};
export const refillHearts=async()=>{
    const currentUserProgress=await getUserProgress();
    if(!currentUserProgress){
        throw new Error("User progress not found");
    }
    if(currentUserProgress.hearts===5){
        throw new Error("Hearts are already full");
    }
    if(currentUserProgress.points<  POINTS_TO_REFILL){
        throw new Error("Not enough points");
    }
    await db.update(userProgress).set({
        hearts:5,
        points:currentUserProgress.points-POINTS_TO_REFILL,

    }).where(eq(userProgress.userId,currentUserProgress.userId));

    revalidatePath("/store");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    }