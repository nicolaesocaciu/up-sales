
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SortableStatCard } from "./stats/SortableStatCard";
import { initialCards } from "./stats/initialData";
import { StatCardData } from "./stats/types";

// SVG Chart Components
const TotalSalesChart = () => (
  <svg width="84" height="22" viewBox="0 0 84 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M76.0116 9.69876L83 8.26712V20.5H1L8.52597 10.8699L16.3 5.92466L23.6606 8.26712L30.5663 11.9111H37.9682L45.9077 8.26712L53.5991 16.3356L61.0837 1.5L68.4443 14.1989L76.0116 9.69876Z" fill="url(#paint0_linear_461_309)"/>
    <path d="M83 8.26712L76.0116 9.69876L68.4443 14.1989L61.0837 1.5L53.5991 16.3356L45.9077 8.26712L37.9682 11.9111H30.5663L23.6606 8.26712L16.3001 5.92466L8.52597 10.8699L1 20.5" stroke="#4E9C54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_461_309" x1="42.5" y1="4" x2="42.5" y2="25.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.0220202" stopColor="#6CAA68" stopOpacity="0.15"/>
        <stop offset="0.8074" stopColor="#6CAA68" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ProfitChart = () => (
  <svg width="90" height="22" viewBox="0 0 90 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M89 6.21218L81.2823 10.8245L73.121 6.21218L65.3589 1.5L57.2419 20.5L48.8589 1.50027L40.5645 10.8245L32.4476 10.8245L24.8629 1.50046L16.4355 1.50027L8.49597 10.8245L1 20.5H57.2419H89V6.21218Z" fill="url(#paint0_linear_461_301)"/>
    <path d="M89 6.21218L81.2823 10.8245L73.121 6.21218L65.3589 1.5L57.2419 20.5L48.8589 1.50027L40.5645 10.8245L32.4476 10.8245L24.8629 1.50046L16.4355 1.50027L8.49597 10.8245L1 20.5" stroke="#4E9C54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_461_301" x1="45.5366" y1="4" x2="45.5366" y2="25.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.0220202" stopColor="#6CAA68" stopOpacity="0.15"/>
        <stop offset="0.8074" stopColor="#6CAA68" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const AvgOrderValueChart = () => (
  <svg width="87" height="22" viewBox="0 0 87 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.4884 10.1988L1.5 8.76712V21H86V5L75.974 11.3699L68.2 6.42466L60.8394 8.76712L53.9337 12.4111H46.5318L38.5923 8.76712L30.9009 16.8356L23.4163 2L16.0557 14.6989L8.4884 10.1988Z" fill="url(#paint0_linear_461_293)"/>
    <path d="M1.5 8.76712L8.4884 10.1988L16.0557 14.6989L23.4163 2L30.9009 16.8356L38.5923 8.76712L46.5318 12.4111H53.9337L60.8394 8.76712L68.2 6.42466L75.974 11.3699L86 5" stroke="#4E9C54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_461_293" x1="42" y1="4.5" x2="42" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0.0220202" stopColor="#6CAA68" stopOpacity="0.15"/>
        <stop offset="0.8074" stopColor="#6CAA68" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const TotalOrdersChart = () => (
  <svg width="90" height="22" viewBox="0 0 90 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12.046H8.70609L16.7665 15.8354L24.4726 1.5L32.7987 20.5L41.2577 1.5L49.0523 8.22305L57.3785 1.5L65.4389 12.046H73.455L81.161 15.8354L89 20.5H32.7987H1V12.046Z" fill="url(#paint0_linear_461_285)"/>
    <path d="M1 12.046H8.70609L16.7665 15.8354L24.4726 1.5L32.7987 20.5L41.2577 1.5L49.0523 8.22305L57.3785 1.5L65.4389 12.046H73.455L81.161 15.8354L89 20.5" stroke="#D44F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_461_285" x1="44.4634" y1="4" x2="44.4634" y2="25.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.0220202" stopColor="#CC334C" stopOpacity="0.15"/>
        <stop offset="0.8074" stopColor="#CC334C" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

interface StatsSectionProps {
  isEditMode?: boolean;
}

export const StatsSection = ({ isEditMode }: StatsSectionProps) => {
  const [cards, setCards] = useState(initialCards);

  // Associate each card with its specific SVG chart
  const getChartForCard = (cardId: string) => {
    switch (cardId) {
      case "total-sales":
        return <TotalSalesChart />;
      case "profit":
        return <ProfitChart />;
      case "avg-order":
        return <AvgOrderValueChart />;
      case "total-orders":
        return <TotalOrdersChart />;
      default:
        return null;
    }
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

  // Create cards with associated charts
  const cardsWithCharts: StatCardData[] = cards.map(card => ({
    ...card,
    chart: getChartForCard(card.id)
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
