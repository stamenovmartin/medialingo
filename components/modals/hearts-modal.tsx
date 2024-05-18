"use client";
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useHeartsModal();
    const onClick=()=>{
        close();
        router.push("/store");
    };

    useEffect(() => setIsClient(true), []);

    if(!isClient) {
        return null};

        return (
            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center w-full justify-center mb-5">
                            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80}/>
                        </div>
                        <DialogTitle className="text-center font-bold text-2xl"
                        onClick={onClick}>
                            Немате повеќе срца!
                        </DialogTitle>
                        <DialogDescription className="text-center text-base">
                            Оди во Pro за повеќе срца, или плати во продавницата.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mb-4">
                       <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
                            Земи срца во Pro
                        </Button>
                        <Button variant="primaryOutline" className="w-full" size="lg" 
                        onClick={close}
                        >
                            Не, благодарам
                        </Button>
                       </div>
                    </DialogFooter>
                </DialogContent>
            
            </Dialog>
        );
};