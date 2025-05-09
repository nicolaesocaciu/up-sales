
export interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: { value: number; trend: "up" | "down" };
  compareText?: string;
  chart?: React.ReactNode;
}
