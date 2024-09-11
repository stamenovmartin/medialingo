import { auth } from "@clerk/nextjs/server";
const allowedIds = [
    "user_2lezqyDSm61ZASkQNc8r6iSzgqj"
]

export const IsAdmin =  () => {
    const {userId} =  auth();

    if(!userId) return false;


    return allowedIds.indexOf(userId)!==-1
}