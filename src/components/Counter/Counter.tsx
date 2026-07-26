import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function Counter({ value, onChange }: CounterProps) {
  return (
    <div className="py-2 flex items-center w-fit">
      <Button
        type="button"
        className="size-5 rounded-sm bg-white cursor-pointer hover:bg-[#F0F4F7]"
        onClick={(e) => {
          e.stopPropagation();
          onChange(Math.max(0, value - 1));
        }}
      >
        <Minus className="text-tertiary" />
      </Button>
      <span className="px-3 text-sm leading-4 text-gray font-medium">
        {value}
      </span>
      <Button
        type="button"
        className="size-5 rounded-sm bg-white cursor-pointer hover:bg-[#F0F4F7]"
        onClick={(e) => {
          e.stopPropagation();
          onChange(value + 1);
        }}
      >
        <Plus className="text-tertiary" />
      </Button>
    </div>
  );
}
