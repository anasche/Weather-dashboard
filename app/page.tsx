"use client";

import { useState, useEffect } from "react";
import { HeaderSection } from "@/components/Widgets/header";
import { Location } from "@/components/Widgets/location";
import { CurrentCondition } from "@/components/Widgets/currentCondition";
import { TemperatureChart } from "@/components/Widgets/temperatureChart";
import { RainFallChart } from "@/components/Widgets/rainFallChart";
import { SoilTemperatureChart } from "@/components/Widgets/soilTemperatureChart";
import { SoilmoistureChart } from "@/components/Widgets/soilMoistureChart";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        <HeaderSection
          lastUpdated={lastUpdated}
          refreshData={refreshData}
          isRefreshing={isRefreshing}
        />

        <Location />

        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          <CurrentCondition currentData={currentData} />

          <TemperatureChart weeklyData={weeklyData} />
          <RainFallChart weeklyData={weeklyData} />
          <SoilTemperatureChart weeklyData={weeklyData} />

          <SoilmoistureChart weeklyData={weeklyData} />
        </div>
      </div>
    </div>
  );
}
