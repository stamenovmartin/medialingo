import { auth } from "@clerk/nextjs/server";
const allowedIds = [
    "user_2gRwm5aaMKk5P0zA6poDBmGXCso"
]

export const IsAdmin =  () => {
    const {userId} =  auth();

    if(!userId) return false;


    return allowedIds.indexOf(userId)!==-1
}