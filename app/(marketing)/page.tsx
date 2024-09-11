import { Button } from "@/components/ui/button";
import { ClerkLoading, ClerkLoaded, SignedOut, SignedIn, SignUpButton, SignOutButton,SignInButton} from "@clerk/nextjs";
import { Loader} from "lucide-react"
import  Image from "next/image";
import Link from "next/link";
export default function Home() {
  return(<div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
   <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
     <Image src ="/Hero.svg" fill alt="Hero" />
   </div>
   <div className="flex flex-col items-center gap-y-8">
   <h1 className="text-lg lg:text-2xl font-extrabold text-neutral-700 max-w-[600px] text-center p-8 bg-gradient-to-r from-green-200 rounded-2xl border-2 border-green-400 shadow-2xl relative">
  Здраво играчу!
  <span className="block mt-4">
    Моето име е Медиалинго. Јас сум карактерот што има секакви познавања во областа на медиумската писменост, вештачката интелигенција и сајбер безбедноста!
  </span>
  <span className="block mt-4">
    Спремен си да ме победиш? Да освојуваш поени со решавање на прашања, загатки и безброј други активности? Да научиш нешто ново? Спремен за авантура?
  </span>
  <span className="block mt-4">
   Ако одговор е да! Стисни на копчето „започни“ !
  </span>
  
  {/* Triangle Arrow */}
  <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[15px] border-t-green-300 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent"></span>
</h1>



        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <><Loader className="h-5 w-5 text-muted-foreground animate-spin">
              </Loader></>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
             <SignUpButton mode="modal" >
              <Button size="lg" variant={"secondary"} className="w-full">
                Започни
              </Button>
             </SignUpButton>
             <SignInButton mode="modal" >
              <Button size="lg" variant={"primaryOutline"} className="w-full">
                Веќе имам направено сметка
              </Button>
             </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant={"secondary"} className="w-full" asChild>
                <Link href="/learn">
                Започни
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
   </div>
  </div>
  )
}
