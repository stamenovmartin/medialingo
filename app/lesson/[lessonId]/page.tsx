import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        lessonId: string; // This might come as a string from the URL
    };
};

const LessonIdPage = async ({ params }: Props) => {
    // Ensure lessonId is a number by parsing it
    const lessonId = parseInt(params.lessonId, 10);

    if (isNaN(lessonId)) {
        redirect("/learn"); // Handle invalid lessonId
        return;
    }

    // Await the promises to ensure data is fetched
    const lessonData = await getLesson(lessonId);
    const userProgressData = await getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress) {
        redirect("/learn");
        return;
    }

    const initialPercentage = (lesson.challanges.filter((challenge) => challenge.completed).length / lesson.challanges.length) * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challanges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null}
            timerDuration={60}
        />
    );
};

export default LessonIdPage;
