
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SortableStatCard } from "./stats/SortableStatCard";
import { initialCards } from "./stats/initialData";

interface StatsSectionProps {
  isEditMode?: boolean;
}

export const StatsSection = ({ isEditMode }: StatsSectionProps) => {
  const [cards, setCards] = useState(initialCards);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={cards}
        strategy={horizontalListSortingStrategy}
      >
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          isEditMode && "cursor-grab"
        )}>
          {cards.map((card) => (
            <SortableStatCard
              key={card.id}
              {...card}
              isEditMode={isEditMode}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
