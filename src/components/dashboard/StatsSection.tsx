
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { StatsCard } from "./StatsCard";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Grip } from "lucide-react";
import { cn } from "@/lib/utils";

const miniChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 450 },
  { name: "May", value: 470 },
  { name: "Jun", value: 480 },
];

interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: { value: number; trend: "up" | "down" };
  chart?: React.ReactNode;
}

const initialCards: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$669,112",
    change: { value: 4, trend: "up" },
    chart: (
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={miniChartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22C55E"
            fillOpacity={1}
            fill="url(#colorValue)"
            isAnimationActive={false}
          />
          <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
          <XAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    id: "profit",
    title: "Profit",
    value: "$325,998",
    change: { value: 12, trend: "up" },
    chart: (
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={miniChartData}>
          <defs>
            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22C55E"
            fillOpacity={1}
            fill="url(#colorValue2)"
            isAnimationActive={false}
          />
          <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
          <XAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    id: "avg-order",
    title: "Average order value",
    value: "$498",
    change: { value: 8, trend: "up" },
    chart: (
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={miniChartData}>
          <defs>
            <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22C55E"
            fillOpacity={1}
            fill="url(#colorValue3)"
            isAnimationActive={false}
          />
          <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
          <XAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1343",
    change: { value: 6, trend: "down" },
    chart: (
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={miniChartData}>
          <defs>
            <linearGradient id="colorValue4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorValue4)"
            isAnimationActive={false}
          />
          <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
          <XAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
];

interface SortableStatCardProps extends StatCardData {
  isEditMode?: boolean;
}

const SortableStatCard = ({ id, isEditMode, ...cardProps }: SortableStatCardProps) => {
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
          <Grip className="h-4 w-4 text-gray-400" />
        </div>
      )}
      <StatsCard {...cardProps} />
    </div>
  );
};

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
