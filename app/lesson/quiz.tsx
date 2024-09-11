"use client";

import { challangeOptions, challanges } from "@/db/schema";
import { useState, useEffect, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challange } from "./challange";
import { Footer } from "./footer";
import { upsertChallangeProgress } from "@/actions/challange-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize, useMount } from "react-use";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challanges.$inferSelect & {
        completed: boolean;
        challangeOptions: typeof challangeOptions.$inferSelect[];
    })[];
    userSubscription: any;
    timerDuration: number;
}

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const { width, height } = useWindowSize();
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts);
    const [lessonId] = useState(initialLessonId);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challanges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challanges.findIndex((challange) => !challange.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    // Timer State
    const [timeLeft, setTimeLeft] = useState(15); // 15 seconds for example

    const challange = challanges[activeIndex];
    const options = challange?.challangeOptions ?? [];

    // Timer Logic
    useEffect(() => {
        if (timeLeft === 0) {
            router.back(); // Go back one page if time runs out
            return;
        }
        const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft, router]);

    const onNext = () => {
        setActiveIndex((current) => current + 1);
        setTimeLeft(15); // Reset timer for the next question
    }

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;
        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }
        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallangeProgress(challange.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        setStatus("correct")
                        setPercentage((prev) => prev + 100 / challanges.length);
                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again"));
            });
        } else {
            startTransition(() => {
                reduceHearts(challange.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again."))
            });
        }
    };

    if (!challange) {
        return (
            <>
                <Confetti
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                    width={width}
                    height={height}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg
                mx-auto text-center items-center justify-center h-full">
                    <Image
                        src='/finish.svg'
                        alt='Finish'
                        className='hidden lg:block'
                        height={100}
                        width={100}
                    />
                    <Image
                        src='/finish.svg'
                        alt='Finish'
                        className='block lg:hidden'
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold
                    text-neutral-700">Одлично!<br /> Го завршивте квизот.</h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challanges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = challange.type === "ASSIST" ? "Медиалинго" : challange.question;

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:test-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challange.type === "ASSIST" && (
                                <QuestionBubble question={challange.question} />
                            )}
                            <Challange
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challange.type}
                            />
                        </div>
                        <div className="text-center text-lg text-red-500">
                            Време останато: {timeLeft} секунди
                        </div>
                    </div>

                </div>

            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
};
