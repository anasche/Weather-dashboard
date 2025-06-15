import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

export const Location = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="text-base px-4 py-2">
          <MapPin className="h-4 w-4 mr-2" />
          New York, USA
        </Badge>
        <Badge variant="outline" className="text-base px-4 py-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Badge>
      </div>
    </div>
  );
};
