import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bluetooth } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { bluetoothService } from '@/services/BluetoothService';
import WeatherCard from './dashboard/WeatherCard';
import AirQualityCard from './dashboard/AirQualityCard';
import RealTimeMonitoringCard from './dashboard/RealTimeMonitoringCard';
import InsightsCard from './dashboard/InsightsCard';
import AirQualityMapCard from './dashboard/AirQualityMapCard';
import HighlightsCard from './dashboard/HighlightsCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';

interface AirQualityData {
  list: [{
    main: { aqi: number },
    components: {
      no2: number,
      o3: number,
      so2: number,
      pm2_5: number,
      pm10: number
    }
  }]
}

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  pressure: number;
  visibility: number;
  feels_like: number;
  sunrise: number;
  sunset: number;
  location: string;
  airQuality: AirQualityData;
}

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [layout, setLayout] = useState(['weather', 'airQuality', 'realTimeMonitoring', 'insights', 'airQualityMap', 'highlights']);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch weather data here
    // For now, we'll use mock data
    const mockWeatherData: WeatherData = {
      temperature: 85,
      description: "Sunny",
      icon: "01d",
      high: 87,
      low: 63,
      humidity: 57,
      pressure: 1015,
      visibility: 10000,
      feels_like: 86,
      sunrise: 1621234567,
      sunset: 1621287654,
      location: "Long Beach, CA",
      airQuality: {
        list: [{
          main: { aqi: 54 },
          components: {
            no2: 12.3,
            o3: 38.2,
            so2: 1.5,
            pm2_5: 52,
            pm10: 13
          }
        }]
      }
    };
    setWeatherData(mockWeatherData);
  }, []);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newLayout = [...layout];
    const draggedItem = newLayout[dragIndex];
    newLayout.splice(dragIndex, 1);
    newLayout.splice(hoverIndex, 0, draggedItem);
    setLayout(newLayout);
  };

  const handleBluetoothConnect = async () => {
    const connected = await bluetoothService.connect();
    if (connected) {
      toast({
        title: "Connected",
        description: "Successfully connected to the device.",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to the device. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm sm:text-base text-muted-foreground">Welcome back,</div>
              <div className="font-semibold text-lg sm:text-xl">User</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex items-center" onClick={handleBluetoothConnect}>
            <Bluetooth className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {layout.map((cardType, index) => (
            <DraggableCard key={cardType} index={index} id={cardType} moveCard={moveCard}>
              {cardType === 'weather' && weatherData && (
                <WeatherCard
                  location={weatherData.location}
                  temperature={weatherData.temperature}
                  high={weatherData.high}
                  low={weatherData.low}
                  description={weatherData.description}
                  airQuality={weatherData.airQuality}
                  humidity={weatherData.humidity}
                />
              )}
              {cardType === 'airQuality' && weatherData && (
                <AirQualityCard airQuality={weatherData.airQuality} />
              )}
              {cardType === 'realTimeMonitoring' && (
                <RealTimeMonitoringCard
                  iaq={32}
                  temperature={72}
                  humidity={45}
                  pressure={1015}
                  co2={400}
                />
              )}
              {cardType === 'insights' && (
                <InsightsCard />
              )}
              {cardType === 'airQualityMap' && (
                <AirQualityMapCard />
              )}
              {cardType === 'highlights' && weatherData && (
                <HighlightsCard
                  humidity={weatherData.humidity}
                  pressure={weatherData.pressure}
                  visibility={weatherData.visibility}
                  feels_like={weatherData.feels_like}
                  sunrise={weatherData.sunrise}
                  sunset={weatherData.sunset}
                />
              )}
            </DraggableCard>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;