import db from "@/db/drizzle";
import { challanges } from "@/db/schema";
import { IsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async(
    req: Request,
    {params}:{params:{
      challangeId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
 
    const data = await db.query.challanges.findFirst({
    where: eq(challanges.id, params.challangeId),});

 return NextResponse.json(data);

};

export const PUT = async(
    req: Request,
    {params}:{params:{
      challangeId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
    const body = await req.json();
    const data = await db.update(challanges).set({
        ...body,
    }).where(eq(challanges.id, params.challangeId)).returning();

 return NextResponse.json(data[0]);

};

export const DELETE = async(
    req: Request,
    {params}:{params:{
      challangeId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
 
    const data = await db.delete(challanges).where(eq(challanges.id, params.challangeId)).returning();

 return NextResponse.json(data[0]);

};

