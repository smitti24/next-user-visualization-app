import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center mt-5 w-20 h-20 w-full">
      <Loader2 className="w-20 h-20 animate-spin" />
    </div>
  );
}

export default Loader;
