import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function Counter() {
  return (
    <div className="py-2 flex items-center w-fit">
      <Button className="size-5 rounded-sm bg-white cursor-pointer hover:bg-[#F0F4F7]">
        <Minus className="text-tertiary3" />
      </Button>
      <span className="px-3 text-sm leading-4 text-gray ">1</span>
      <Button className="size-5 rounded-sm bg-white cursor-pointer hover:bg-[#F0F4F7]">
        <Plus className="text-tertiary3" />
      </Button>
    </div>
  );
}
