import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/macedonia.svg" alt="Macedonian" height={40} width={40} className="mr-4 rounded-md"/>
                    Македонски
                </Button>
                <div className="w-8" /> {/* Spacer */}
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/uk.svg" alt="English" height={40} width={40} className="mr-4 rounded-md"/>
                    Англиски
                </Button>
                <div className="w-8" /> {/* Spacer */}
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/germany.svg" alt="German" height={40} width={40} className="mr-4 rounded-md"/>
                    Германски
                </Button>
                <div className="w-8" /> {/* Spacer */}
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/france.svg" alt="French" height={40} width={40} className="mr-4 rounded-md"/>
                    Француски
                </Button>
                <div className="w-8" /> {/* Spacer */}
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/spain.svg" alt="Spanish" height={40} width={40} className="mr-4 rounded-md"/>
                    Шпански
                </Button>
            </div>
        </footer>
    );
};
