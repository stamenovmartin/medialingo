"use client";
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";
import Image from "next/image";
import { useEffect,useState } from "react";

export const PracticeModal = () => {
   
    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = usePracticeModal();
   
    useEffect(() => setIsClient(true), []);

    if(!isClient) {
        return null};

        return (
            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center w-full justify-center mb-5">
                            <Image src="/heart.svg" alt="Heart" height={100} width={100}/>
                        </div>
                        <DialogTitle className="text-center font-bold text-2xl"
                        >
                            Извежбај ја лекцијата!
                        </DialogTitle>
                        <DialogDescription className="text-center text-base">
                           Искористи ја вежбата за да освоиш срца и поени. Не можеш да изгубиш срца ниту поени во овие вежби.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mb-4">
                       <div className="flex flex-col gap-y-4 w-full">
                        
                        <Button variant="primary" className="w-full" size="lg" 
                        onClick={close}
                        >
                            Јасно!
                        </Button>
                       </div>
                    </DialogFooter>
                </DialogContent>
            
            </Dialog>
        );
};