import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RoundedTooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="default" className="bg-[#5bc2dc] hover:bg-[#4ab1cb] text-slate-900 rounded-full font-bold shadow-lg shadow-[#5bc2dc]/20">
          Сохранить конфигурацию
        </Button>
      </TooltipTrigger>
      <TooltipContent className="rounded-full bg-slate-900 text-slate-100 border-none font-medium px-4 py-2 shadow-xl shadow-black/20" sideOffset={8}>
        <p>Сохранить текущие параметры в ссылку</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default RoundedTooltipDemo;
