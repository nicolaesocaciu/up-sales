
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StatsCard } from "../StatsCard";
import { StatCardData } from "./types";
import { DragDotsIcon } from "@/components/ui/icons/DragDotsIcon";

interface SortableStatCardProps extends StatCardData {
  isEditMode?: boolean;
}

export const SortableStatCard = ({ id, isEditMode, ...cardProps }: SortableStatCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {isEditMode && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute"
        >
          <DragDotsIcon className="h-5 w-5 text-[#494A4A] ml-[-21px] mt-[1px]" />
        </div>
      )}
      <StatsCard {...cardProps} />
    </div>
  );
};
