import { challangeOptions,challanges } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options: typeof challangeOptions.$inferSelect[];
    onSelect: (id:number) => void;
    status: "correct" | "wrong" | "none" ;
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challanges.$inferSelect["type"];

};

export const Challange = ({
options,
onSelect,
status,
selectedOption,
disabled,
type,

}: Props) => {
    return (
       /* <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>

        */
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        )}>
        
        
          {options.map((option,i)=>(
           <Card
                  key={option.id}
                  id={option.id}
                  text ={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  disabled={disabled}
                  type={type}
                  />
          ))}  
        </div>
    );
};