import { StatsCard } from "@/components/dashboard/StatsCard";
import { useState, useEffect } from "react";

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
    data.push({ value: Math.round(value) });
  }
  
  return data;
};

// SVG Chart Components from dashboard
const LeadGenerationChart = () => (
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

const SalesConversionChart = () => (
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

const EngagementChart = () => (
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

const GeneratedIncomeChart = () => (
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

export const MarketingStats = () => {
  // Use state instead of useMemo to ensure new data on each render
  const [chartData, setChartData] = useState({
    leadGeneration: [] as { value: number }[],
    salesConversion: [] as { value: number }[],
    engagement: [] as { value: number }[],
    generatedIncome: [] as { value: number }[]
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
    console.log("Generating new chart data");
    setChartData({
      leadGeneration: generateChartData(10, "up", 1000, 2300),
      salesConversion: generateChartData(10, "down", 390, 600),
      engagement: generateChartData(10, "up", 5000, 9100),
      generatedIncome: generateChartData(10, "up", 8000, 12000)
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Lead generation"
        value="2,245"
        change={{ value: 28, trend: "up" }}
        compareText="from 987 (last 30 days)"
        chart={<LeadGenerationChart />}
      />
      
      <StatsCard
        title="Sales Conversion"
        value="393"
        change={{ value: 12, trend: "down" }}
        compareText="from 568 (last 30 days)"
        chart={<SalesConversionChart />}
      />
      
      <StatsCard
        title="Engagement"
        value="9,026"
        change={{ value: 67, trend: "up" }}
        compareText="from 2,873 (last 30 days)"
        chart={<EngagementChart />}
      />

      <StatsCard
        title="Generated income"
        value="$ 9,862"
        change={{ value: 13, trend: "up" }}
        compareText="from $8,728 (last 30 days)"
        chart={<GeneratedIncomeChart />}
      />
    </div>
  );
};
