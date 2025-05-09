
import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
export const OrderFooter = () => {
  return <div className="mt-auto border-t border-[#DADADA] pt-8">
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline" className="flex-1 w-[160px]">
            Close
          </Button>
        </SheetClose>
        <Button className="flex-1 border-[#0D5788] bg-[#0D5788]">
          Fulfill order
        </Button>
      </SheetFooter>
    </div>;
};
