"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CloudRain,
  Thermometer,
  Droplets,
  MapPin,
  RefreshCw,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// API Configuration
const API_KEY = "your_openweathermap_api_key"; // Replace with actual API key
const CITY = "New York";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Commented out API functions - uncomment when API key is available
/*
const fetchCurrentWeather = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return {
      temperature: data.main.temp,
      rainfall: data.rain ? data.rain['1h'] || 0 : 0,
      location: `${data.name}, ${data.sys.country}`
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
};

const fetchHistoricalWeather = async () => {
  try {
    // Note: OpenWeatherMap's historical data requires a paid plan
    // For free tier, we would need to store daily data or use forecast API
    const promises = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const timestamp = Math.floor(date.getTime() / 1000);
      
      // This would require One Call API 3.0 (paid)
      const promise = fetch(
        `${API_BASE_URL}/onecall/timemachine?lat=40.7128&lon=-74.0060&dt=${timestamp}&appid=${API_KEY}&units=metric`
      );
      promises.push(promise);
    }
    
    const responses = await Promise.all(promises);
    const weatherData = await Promise.all(responses.map(r => r.json()));
    
    return weatherData.map((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        temperature: day.current.temp,
        rainfall: day.current.rain ? day.current.rain['1h'] || 0 : 0,
        soilTemperature: day.current.temp - 2, // Approximation
        soilMoisture: 50 + (day.current.humidity - 50) * 0.3 // Approximation based on humidity
      };
    });
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return null;
  }
};
*/

// Mock data generator with realistic patterns
const generateSevenDayData = () => {
  const data = [];
  const today = new Date();

  // Static labels as requested
  const labels = [
    "Jan 1",
    "Jan 2",
    "Jan 3",
    "Jan 4",
    "Jan 5",
    "Jan 6",
    "Jan 7",
  ];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate random values as requested for each reload
    const temperature = Math.round((12 + Math.random() * 25) * 10) / 10; // 12-37°C range
    const rainfall = Math.round(Math.random() * 50 * 10) / 10; // 0-50mm range
    const soilTemperature = Math.round((10 + Math.random() * 20) * 10) / 10; // 10-30°C range
    const soilMoisture = Math.round((25 + Math.random() * 50) * 10) / 10; // 25-75% range

    data.push({
      date:
        labels[6 - i] ||
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      temperature,
      rainfall,
      soilTemperature,
      soilMoisture,
    });
  }

  return data;
};

export default function WeatherDashboard() {
  const [weeklyData, setWeeklyData] = useState(generateSevenDayData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);

    try {
      // Uncomment when API is available
      /*
      const currentWeather = await fetchCurrentWeather();
      const historicalData = await fetchHistoricalWeather();
      
      if (historicalData) {
        setWeeklyData(historicalData);
      } else {
        // Fallback to mock data
        setWeeklyData(generateSevenDayData());
      }
      */

      // Using mock data with random values for each refresh
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setWeeklyData(generateSevenDayData());
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error refreshing data:", error);
      // Fallback to mock data
      setWeeklyData(generateSevenDayData());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Auto-refresh every 1 hour (3600000 ms)
    const interval = setInterval(refreshData, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Get current day data (last item in array)
  const currentData = weeklyData[weeklyData.length - 1];

  const ChartCard = ({ title, dataKey, color, icon: Icon, unit }: any) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className={`h-5 w-5 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: any) => [`${value}${unit}`, title]}
              labelFormatter={(label) => {
                const item = weeklyData.find((d) => d.date === label);
                return item ? item.fullDate : label;
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={
                color.includes("red")
                  ? "#ef4444"
                  : color.includes("blue")
                  ? "#3b82f6"
                  : color.includes("orange")
                  ? "#f97316"
                  : color.includes("emerald")
                  ? "#10b981"
                  : "#6b7280"
              }
              strokeWidth={3}
              dot={{
                fill: color.includes("red")
                  ? "#ef4444"
                  : color.includes("blue")
                  ? "#3b82f6"
                  : color.includes("orange")
                  ? "#f97316"
                  : color.includes("emerald")
                  ? "#10b981"
                  : "#6b7280",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: color.includes("red")
                  ? "#ef4444"
                  : color.includes("blue")
                  ? "#3b82f6"
                  : color.includes("orange")
                  ? "#f97316"
                  : color.includes("emerald")
                  ? "#10b981"
                  : "#6b7280",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
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

        {/* Location and Date */}
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

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          {/* Summary Box */}
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
                  <div className="text-4xl font-bold">
                    {currentData?.rainfall}mm
                  </div>
                  <div className="text-lg text-white/80 flex items-center gap-2">
                    <CloudRain className="h-5 w-5" />
                    Rainfall
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Chart */}
          <div className="col-span-4">
            <ChartCard
              title="Temperature (7 Days)"
              dataKey="temperature"
              color="text-red-500"
              icon={Thermometer}
              unit="°C"
            />
          </div>

          {/* Rainfall Chart */}
          <div className="col-span-4">
            <ChartCard
              title="Rainfall (7 Days)"
              dataKey="rainfall"
              color="text-blue-500"
              icon={CloudRain}
              unit="mm"
            />
          </div>

          {/* Soil Temperature Chart */}
          <div className="col-span-6">
            <ChartCard
              title="Soil Temperature (7 Days)"
              dataKey="soilTemperature"
              color="text-orange-500"
              icon={Thermometer}
              unit="°C"
            />
          </div>

          {/* Soil Moisture Chart */}
          <div className="col-span-6">
            <ChartCard
              title="Soil Moisture (7 Days)"
              dataKey="soilMoisture"
              color="text-emerald-500"
              icon={Droplets}
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
