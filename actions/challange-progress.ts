"use server"
import { getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import {and,eq} from "drizzle-orm";
import db from "@/db/drizzle";
import {challanges,challangeProgress,userProgress} from '@/db/schema';
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertChallangeProgress=async(challangeId:number)=>{
    const {userId}=await auth();
    if(!userId){
        throw new Error("User not logged!")
    }
    const currentUserProgress=await getUserProgress();
    if(!currentUserProgress){
        throw new Error("User progress not found ");
    }
    const challange=await db.query.challanges.findFirst({
        where:eq(challanges.id,challangeId)
    });

    if(!challange){
        throw new Error("Challange not found");
    }
    const lessonId=challange.lessonId;
    const existingChallangeProgress=await db.query.challangeProgress.findFirst({
        where:and(
            eq(challangeProgress.userId,userId),
            eq(challangeProgress.challangeId,challangeId),
        ),
    });

    const isPractice=!!existingChallangeProgress;
    if (currentUserProgress.hearts===0 && !isPractice){
        return { error:"hearts"};
    }
    if (isPractice){
        await db.update(challangeProgress).set({
            completed:true
        }).where(eq(challangeProgress.id,existingChallangeProgress.id));
        await db.update(userProgress).set({
            hearts:Math.min(currentUserProgress.hearts+1,5),
            points:currentUserProgress.points+10
        }).where(eq(userProgress.userId,userId));

        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }
    await db.insert(challangeProgress).values({
        challangeId,
        userId,
        completed:true,
    });
    await db.update(userProgress).set({
        points:currentUserProgress.points+15,

    }).where(eq(userProgress.userId,userId));
        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
}