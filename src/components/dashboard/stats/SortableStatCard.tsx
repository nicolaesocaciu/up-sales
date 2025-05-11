
import { Grip } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StatsCard } from "../StatsCard";
import { StatCardData } from "./types";

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
          className="absolute left-6 top-6 cursor-grab active:cursor-grabbing z-10"
        >
          <Grip className="h-4 w-4 text-[#494A4A] ml-[-18px] mt-[4px]" />
        </div>
      )}
      <StatsCard {...cardProps} />
    </div>
  );
};
