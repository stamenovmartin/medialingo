import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress"
import { getUserProgress } from "@/db/queries"
import Image from "next/image";
import { redirect } from "next/navigation";
import { Flag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const quests = [
    {
        title: "Освој 20 поени",
        value: 20, 
    },
    {
        title: "Освој 40 поени",
        value: 40, 
    },
    {
        title: "Освој 80 поени",
        value: 80, 
    },
    {
        title: "Освој 100 поени",
        value: 100, 
    },
    {
        title: "Освој 300 поени",
        value: 300, 
    },
    {
        title: "Освој 500 поени",
        value: 500, 
    },
    {
        title: "Освој 1000 поени",
        value: 1000, 
    },
    {
        title: "Освој 5000 поени",
        value: 5000, 
    },
    {
        title: "Освој 7500 поени",
        value: 7500, 
    },
    {
        title: "Освој 10000 поени",
        value: 10000, 
    },
]

const QuestsPage=async()=>{
    const userProgressData=getUserProgress();
    const [
        userProgress,
    ]=await Promise.all([
        userProgressData,
    ]);
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={false}
                />
                
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                    src='/quests.svg'
                    alt="Quests"
                    height={90}
                    width={90}
                     />
                     <h1 className="text-center font-bold text-neutral-800 text-2xl
                     my-6">
                        Мисии
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Изврши ги мисиите преку освојување на поени !</p>
                   <ul className="w-full ">
                    {quests.map((quests)=>{
                      const progress = (userProgress.points / quests.value) * 100;
                      console.log({progress, value:quests.value})
                      return (
                        <div
                        className="flex items-center w-full p-4 gap-x-4 border-t-2"
                        key ={quests.title} 
                        >
                            <Image 
                            src = "/points.svg"
                            alt="Points"
                            width={60}
                            height={60}
                            />
                            <div className="flex flex-col gap-y-2 w-full ">
                               <p className="text-neutral-700 text-xl font-bold">
                                {quests.title}
                               </p>
                               <Progress value = {progress} className="h-3"/>
                            </div>
                        </div>
                      ) 
                    })}

                   </ul>
                </div>
            </FeedWrapper>

        </div>
    )
}
export default QuestsPage;