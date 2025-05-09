import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
export const OrderFooter = () => {
  return <div className="mt-auto border-t border-[#DADADA] p-4">
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline" className="rounded-[8px] border-[1px] border-[#8A8A8A] bg-[#FFFFFF] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)] flex-1 w-[160px]">
            Close
          </Button>
        </SheetClose>
        <Button className="rounded-[8px] border-[1px] border-[#2D7048] bg-[#2D7048] shadow-[0px_2px_4px_0px_rgba(78,156,84,0.20)] flex-1">
          Fulfill order
        </Button>
      </SheetFooter>
    </div>;
};