import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challanges} from "@/db/schema";
import { json } from "stream/consumers";
import { IsAdmin } from "@/lib/admin";

export const GET = async() => {
    if (!IsAdmin()) return new NextResponse("Unauthorized", {status:401});
    const data = await db.query.challanges.findMany();

    return NextResponse.json(data);
};

export const POST = async(req: Request) => {
    if (!IsAdmin()) return new NextResponse("Unauthorized", {status:401});
    
    const body = await req.json();
    const data = await db.insert(challanges).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
};