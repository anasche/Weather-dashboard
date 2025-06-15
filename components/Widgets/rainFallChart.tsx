import { CloudRain } from "lucide-react";
import { ChartCard } from "@/components/ChartCard/chartCard";

export const RainFallChart = ({ weeklyData }: any) => {
  return (
    <div className="col-span-4">
      <ChartCard
        title="Rainfall (7 Days)"
        dataKey="rainfall"
        color="text-blue-500"
        icon={CloudRain}
        unit="mm"
        weeklyData={weeklyData}
      />
    </div>
  );
};
