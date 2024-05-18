import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import {ClerkLoading, ClerkLoaded, UserButton } from '@clerk/nextjs'
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";
type Props = {
    className?:string;
};

export const Sidebar = ({className}:Props) =>{
    return(
       <div className={cn(" flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-3 border-r-2 flex-col", className,)}>
        <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center">
                 <Image src="/mascot.svg" height={120} width={70} alt="Mascot" />
                 <h1 className = "text-2xl font-extrabold text-green-600">
                    Медиалинго
                 </h1>
              </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
          <SidebarItem label="Научи" href="/learn" iconSrc="/learn.svg" />
          <SidebarItem label="Табела со поени" href="/leaderboard" iconSrc="/leaderboard.svg" />
          <SidebarItem label="Мисии" href="/quests" iconSrc="/quests.svg" />
          <SidebarItem label="Продавница" href="/store" iconSrc="/shop.svg" />
        </div>
        <div className="p-4">
        <ClerkLoading>
           <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
        </ClerkLoading>
        <ClerkLoaded>
            <UserButton afterSignOutUrl="/"/>
        </ClerkLoaded>
        </div>
       </div> 
    );
};