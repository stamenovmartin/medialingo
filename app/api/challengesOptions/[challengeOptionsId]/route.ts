import db from "@/db/drizzle";
import { challangeOptions } from "@/db/schema";
import { IsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async(
    req: Request,
    {params}:{params:{
      challangeOptionsId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
 
    const data = await db.query.challangeOptions.findFirst({
    where: eq(challangeOptions.id, params.challangeOptionsId),});

 return NextResponse.json(data);

};

export const PUT = async(
    req: Request,
    {params}:{params:{
      challangeOptionsId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
    const body = await req.json();
    const data = await db.update(challangeOptions).set({
        ...body,
    }).where(eq(challangeOptions.id, params.challangeOptionsId)).returning();

 return NextResponse.json(data[0]);

};

export const DELETE = async(
    req: Request,
    {params}:{params:{
      challangeOptionsId: number}},
) =>{
 if(!IsAdmin) {
    return new NextResponse("Unauthorized",{status:403})
 }
 
    const data = await db.delete(challangeOptions).where(eq(challangeOptions.id, params.challangeOptionsId)).returning();

 return NextResponse.json(data[0]);

};

