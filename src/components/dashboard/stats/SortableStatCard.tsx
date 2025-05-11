
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
    <div ref={setNodeRef} style={style} className="relative group">
      {isEditMode && (
        <div 
          className="absolute left-6 top-6 cursor-grab active:cursor-grabbing z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <DragDotsIcon className="h-5 w-5 text-[#494A4A] ml-[-21px] mt-[1px]" />
        </div>
      )}
      <div 
        {...(isEditMode ? { ...attributes, ...listeners } : {})}
        className={isEditMode ? "cursor-grab active:cursor-grabbing" : ""}
      >
        <StatsCard {...cardProps} />
      </div>
    </div>
  );
};
