import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, CloudSun } from "lucide-react";

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

interface WeatherCardProps {
  location: string;
  temperature: number;
  high: number;
  low: number;
  description: string;
  airQuality: AirQualityData;
  humidity: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  location, 
  temperature, 
  high, 
  low, 
  description, 
  airQuality,
  humidity
}) => {
  const aqi = airQuality?.list[0]?.main?.aqi ?? 0;
  const pm2_5 = airQuality?.list[0]?.components?.pm2_5 ?? 0;
  const pm10 = airQuality?.list[0]?.components?.pm10 ?? 0;
  
  return (
    <Card className="bg-white md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm sm:text-base">{location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-4xl sm:text-5xl font-bold">{temperature}°</div>
            <div className="text-sm sm:text-base text-muted-foreground">{high}° / {low}°</div>
          </div>
          <CloudSun className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-green-100 p-2 rounded-md text-center">
            <div className="text-lg font-semibold">{aqi}</div>
            <div className="text-xs">AQI</div>
          </div>
          <div className="bg-yellow-100 p-2 rounded-md text-center">
            <div className="text-lg font-semibold">{pm2_5.toFixed(0)}</div>
            <div className="text-xs">PM2.5</div>
          </div>
          <div className="bg-green-100 p-2 rounded-md text-center">
            <div className="text-lg font-semibold">{pm10.toFixed(0)}</div>
            <div className="text-xs">PM10</div>
          </div>
          <div className="bg-green-100 p-2 rounded-md text-center">
            <div className="text-lg font-semibold">{humidity}%</div>
            <div className="text-xs">Humidity</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;