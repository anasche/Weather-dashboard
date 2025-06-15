import { Thermometer } from "lucide-react";
import { ChartCard } from "@/components/ChartCard/chartCard";
export const SoilTemperatureChart = ({ weeklyData }: any) => {
  return (
    <div className="col-span-6">
      <ChartCard
        title="Soil Temperature (7 Days)"
        dataKey="soilTemperature"
        color="text-orange-500"
        icon={Thermometer}
        unit="°C"
        weeklyData={weeklyData}
      />
    </div>
  );
};
