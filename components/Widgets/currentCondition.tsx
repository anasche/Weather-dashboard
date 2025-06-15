import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Thermometer } from "lucide-react";
export const CurrentCondition = ({ currentData }: any) => {
  return (
    <Card className="col-span-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="text-xl text-white/90">
          Current Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold">
              {currentData?.temperature}°C
            </div>
            <div className="text-lg text-white/80 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold">{currentData?.rainfall}mm</div>
            <div className="text-lg text-white/80 flex items-center gap-2">
              <CloudRain className="h-5 w-5" />
              Rainfall
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
