import { Loader} from "lucide-react";

const Loading = () => {
    return (
<div className="h-full w-full flex items-center justify-center ">
<Loader className="H-6 W-6 text-muted-foreground animate-spin"/>
</div>
    );
};

export default Loading;