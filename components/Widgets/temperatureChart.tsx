import { Thermometer } from "lucide-react";
import { ChartCard } from "@/components/ChartCard/chartCard";
export const TemperatureChart = ({ weeklyData }: any) => {
  return (
    <div className="col-span-4">
      <ChartCard
        title="Temperature (7 Days)"
        dataKey="temperature"
        color="text-red-500"
        icon={Thermometer}
        unit="°C"
        weeklyData={weeklyData}
      />
    </div>
  );
};
