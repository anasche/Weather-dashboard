import { MapPin, RefreshCw } from "lucide-react";

export const HeaderSection = ({
  lastUpdated,
  refreshData,
  isRefreshing,
}: any) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Weather Dashboard
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-slate-600">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
        <button
          onClick={refreshData}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};
