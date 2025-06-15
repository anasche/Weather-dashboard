import { Droplets } from "lucide-react";
import { ChartCard } from "@/components/ChartCard/chartCard";

export const SoilmoistureChart = ({ weeklyData }: any) => {
  return (
    <div className="col-span-6">
      <ChartCard
        title="Soil Moisture (7 Days)"
        dataKey="soilMoisture"
        color="text-emerald-500"
        icon={Droplets}
        unit="%"
        weeklyData={weeklyData}
      />
    </div>
  );
};
