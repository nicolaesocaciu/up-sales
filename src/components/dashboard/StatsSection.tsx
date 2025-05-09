
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SortableStatCard } from "./stats/SortableStatCard";
import { initialCards } from "./stats/initialData";

// Simple line chart component using SVG path
const StaticLineChart = ({ data, trend }: { data: number[], trend: "up" | "down" }) => {
  // Calculate path dimensions
  const height = 32;
  const width = 160;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Create SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  // Color based on trend
  const color = trend === "up" ? "#22C55E" : "#EF4444";
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface StatsSectionProps {
  isEditMode?: boolean;
}

export const StatsSection = ({ isEditMode }: StatsSectionProps) => {
  const [cards, setCards] = useState(initialCards);

  // Create static chart components based on chart data
  const createStaticChart = (chartData: number[] | undefined, trend: "up" | "down") => {
    if (!chartData || chartData.length === 0) return null;
    return <StaticLineChart data={chartData} trend={trend} />;
  };

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

  // Create cards with static charts
  const cardsWithCharts = cards.map(card => ({
    ...card,
    chart: createStaticChart(card.chartData, card.change.trend)
  }));

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={cardsWithCharts}
        strategy={horizontalListSortingStrategy}
      >
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          isEditMode && "cursor-grab"
        )}>
          {cardsWithCharts.map((card) => (
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
