"use client";

import { challangeOptions, challanges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challange } from "./challange";
import { Footer } from "./footer";

type Props ={
    initialPercentage: number;
    initialHearts : number;
    initialLessonId : number;
    initialLessonChallenges: (typeof challanges.$inferSelect & {
        completed: boolean;
        challangeOptions: typeof challangeOptions.$inferSelect[];
    })[];
    userSubscription : any;
}

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}:Props) =>{
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challanges] = useState(initialLessonChallenges);
    const [activeIndex,setActiveIndex] = useState(() =>{
        const uncompletedIndex = challanges.findIndex((challange) => !challange.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status,setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challange = challanges[activeIndex];
    const options = challange!.challangeOptions ?? [];

    const onSelect = (id:number) => {
     if (status !== "none") return;  
     
     setSelectedOption(id);
    };
    const title = challange.type ==="ASSIST" ? "Select the correct meaning": 
    challange.question;



    return(
<>
<Header 
 hearts={hearts}
 percentage ={percentage}
 hasActiveSubscription={!!userSubscription?.isActive}
/>
<div className="flex-1">
    <div className="h-full flex items-center justify-center">
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:test-start font-bold text-neutral-700">
                {title}
            </h1>
            <div>
                {challange.type ==="ASSIST" && (
                    <QuestionBubble  question={challange.question}/>
                )}
                <Challange 
                options = {options}
                onSelect = {onSelect}
                status ={status}
                selectedOption = {selectedOption}
                disabled = {false}
                type = {challange.type}
                />
            </div>
        </div>

    </div>

</div>
<Footer 
disabled = {!selectedOption}
status = {status}
onCheck ={() => {}}
/>
</>
    );
};