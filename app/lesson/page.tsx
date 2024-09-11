import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

type Props = {
    params: {
        lessonId: number;
    };
};

const LessonPage = async ({ params }: Props) => {
    // Pass the lessonId from params
    const lessonData = getLesson(params.lessonId);
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage =
        (lesson.challanges.filter((challenge) => challenge.completed).length / lesson.challanges.length) * 100;

    const timerDuration = 60; // Set timer duration (e.g., 60 seconds)

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challanges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null}
            timerDuration={timerDuration}
        />
    );
};

export default LessonPage;
