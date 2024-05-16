import { lessons ,units} from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props={
    id:number;
    ordder:number;
    title:string;
    description:string;
    lessons:(typeof lessons.$inferSelect &{
        completed:boolean;
    })[];
    activeLesson:typeof lessons.$inferSelect &{
        unit:typeof units.$inferSelect;
    }| undefined;
    activeLessonPercentage:number;

}
export const Unit=({
    id,
    ordder,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage
}:Props)=>{
    return(
        <>
            <UnitBanner title={title} description={description}/>
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson,index)=>{
                    const isCurrent=true || lesson.id===activeLesson?.id;//todo remove true
                    const isLocked=!lesson.completed&&!isCurrent;
                    return(
                        <LessonButton
                        key={lesson.id}
                        id={lesson.id}
                        index={index}
                        totalCount={lessons.length-1}
                        current={isCurrent}
                        locked={isLocked}
                        percentage={activeLessonPercentage}
                        />
                    );
                })}

            </div>
        </>
    )
}