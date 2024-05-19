
import Link from "next/link";
import Image from "next/image";
import { Button} from "./button";
import { quests } from "@/constants";
import { Progress } from "./progress";

type Props = {
    points:number;
};

export const Quests = ({points}: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4 border-green-600">
          <div className="flex items-center justify-between w-full space-y-2">
            <h3 className="font-bold text-lg text-green-600">
            Мисии
            </h3>
            <Link
            href="/quests"
            >
                <Button
                size = "sm"
                variant="secondaryOutline"
                >
                    Види ги сите
                </Button>
            </Link>
          </div>
        </div>
    )
}