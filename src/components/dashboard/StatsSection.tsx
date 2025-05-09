
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SortableStatCard } from "./stats/SortableStatCard";
import { initialCards } from "./stats/initialData";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// Function to generate random chart data with a trend
const generateChartData = (points: number, trend: "up" | "down", minValue: number, maxValue: number) => {
  const data = [];
  const range = maxValue - minValue;
  const step = range / points;
  
  // Generate baseline data
  let value = trend === "up" ? minValue : maxValue;
  
  for (let i = 0; i < points; i++) {
    // Add some randomness but maintain the general trend
    const randomVariation = Math.random() * (step * 0.8);
    
    if (trend === "up") {
      value = value + (step * 0.5) + randomVariation;
    } else {
      value = value - (step * 0.5) - randomVariation;
    }
    
    // Ensure we stay within our min/max bounds
    value = Math.max(minValue, Math.min(maxValue, value));
    data.push({ name: `Point ${i}`, value: Math.round(value) });
  }
  
  return data;
};

interface StatsSectionProps {
  isEditMode?: boolean;
}

export const StatsSection = ({ isEditMode }: StatsSectionProps) => {
  const [cards, setCards] = useState(initialCards);
  const [chartData, setChartData] = useState({
    "total-sales": [] as { name: string, value: number }[],
    "profit": [] as { name: string, value: number }[],
    "avg-order": [] as { name: string, value: number }[],
    "total-orders": [] as { name: string, value: number }[]
  });

  // Generate new chart data every 5 seconds
  useEffect(() => {
    // Generate initial data
    generateNewChartData();
    
    // Set up interval to regenerate data
    const intervalId = setInterval(() => {
      generateNewChartData();
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to generate new chart data
  const generateNewChartData = () => {
    console.log("Generating new dashboard chart data");
    setChartData({
      "total-sales": generateChartData(6, "up", 300, 500),
      "profit": generateChartData(6, "up", 250, 450),
      "avg-order": generateChartData(6, "up", 400, 550),
      "total-orders": generateChartData(6, "down", 1000, 1500)
    });
  };

  // Create dynamic chart components based on trend
  const createDynamicChart = (id: string, trend: "up" | "down") => {
    const data = chartData[id as keyof typeof chartData];
    if (!data || data.length === 0) return null;
    
    const color = trend === "up" ? "#22C55E" : "#EF4444";
    const gradientId = `colorValue-${id}`;
    
    return (
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.1} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
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

  // Create updated cards with dynamic charts
  const cardsWithDynamicCharts = cards.map(card => ({
    ...card,
    chart: createDynamicChart(card.id, card.change.trend)
  }));

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={cardsWithDynamicCharts}
        strategy={horizontalListSortingStrategy}
      >
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          isEditMode && "cursor-grab"
        )}>
          {cardsWithDynamicCharts.map((card) => (
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
