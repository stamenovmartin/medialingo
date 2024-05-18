import Image from "next/image";

type Props = {
    question: string;
};

export const QuestionBubble = ({question}: Props) => {
return(
    <div className="flex items-center gap-x-4 mb-6">
        <Image 
        src="/mascot.svg"
        alt="Mascot"
        height={120}
        width={120}
        className="hidden lg:block "
        />
         <Image 
        src="/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="block lg:hidden "
        />
        <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">{question}</div>
    </div>
)
}