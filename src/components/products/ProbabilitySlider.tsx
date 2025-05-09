
import React from "react";
import { Slider } from "@/components/ui/slider";

interface ProbabilitySliderProps {
  stockPrediction: string;
}

export const ProbabilitySlider = ({ stockPrediction }: ProbabilitySliderProps) => {
  // Calculate probability value based on stock prediction
  const getProbabilityValue = (prediction: string): number => {
    if (prediction === "Stable stock") return 75;
    if (prediction === "Overstock stock") return 90;
    if (prediction === "Low stock") return 50;
    if (prediction.startsWith("Out of stock in")) return 30;
    return 15; // Insufficient data
  };

  // Get appropriate color based on stock prediction
  const getSliderColor = (prediction: string): string => {
    if (prediction === "Stable stock") return "#4E9C54"; // Green
    if (prediction === "Overstock stock") return "#116FAE"; // Blue
    if (prediction === "Low stock") return "#F97316"; // Orange
    if (prediction.startsWith("Out of stock in")) return "#E11D48"; // Red
    return "#8A8A8A"; // Gray for insufficient data
  };

  const value = getProbabilityValue(stockPrediction);
  const color = getSliderColor(stockPrediction);

  return (
    <div className="w-[120px]">
      <Slider
        value={[value]}
        disabled
        className="cursor-default"
        style={{
          "--slider-range-color": color
        } as React.CSSProperties}
      />
    </div>
  );
};
