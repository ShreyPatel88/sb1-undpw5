import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bluetoothService } from '@/services/BluetoothService';

const RealTimeMonitoringCard: React.FC = () => {
  const [data, setData] = useState({
    iaq: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0,
    co2: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (bluetoothService.isConnected()) {
        try {
          const temperature = await bluetoothService.readCharacteristic('temperature');
          const humidity = await bluetoothService.readCharacteristic('humidity');
          const pressure = await bluetoothService.readCharacteristic('pressure');
          const bsec = await bluetoothService.readCharacteristic('bsec');
          const co2 = await bluetoothService.readCharacteristic('co2');

          setData({
            iaq: Math.round(bsec),
            temperature: temperature,
            humidity: humidity,
            pressure: pressure,
            co2: co2,
          });
        } catch (error) {
          console.error('Error reading data from Nicla Sense ME:', error);
        }
      }
    };

    const interval = setInterval(fetchData, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const getIAQStatus = (iaq: number) => {
    if (iaq <= 50) return 'Good';
    if (iaq <= 100) return 'Moderate';
    if (iaq <= 150) return 'Unhealthy for Sensitive Groups';
    if (iaq <= 200) return 'Unhealthy';
    if (iaq <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getIAQColor = (iaq: number) => {
    if (iaq <= 50) return 'text-green-500';
    if (iaq <= 100) return 'text-yellow-500';
    if (iaq <= 150) return 'text-orange-500';
    if (iaq <= 200) return 'text-red-500';
    if (iaq <= 300) return 'text-purple-500';
    return 'text-rose-500';
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Real-Time Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <span className={`text-5xl sm:text-6xl font-bold ${getIAQColor(data.iaq)}`}>
            {data.iaq}
          </span>
          <div>
            <div className="font-semibold">{getIAQStatus(data.iaq)}</div>
            <div className="text-sm text-muted-foreground">Indoor Air Quality</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Temperature</div>
            <div className="text-base sm:text-lg font-semibold">
              {data.temperature.toFixed(1)}°C
            </div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="text-base sm:text-lg font-semibold">
              {data.humidity.toFixed(1)}%
            </div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Pressure</div>
            <div className="text-base sm:text-lg font-semibold">
              {data.pressure.toFixed(1)} hPa
            </div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-sm text-muted-foreground">CO2</div>
            <div className="text-base sm:text-lg font-semibold">
              {data.co2} ppm
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMonitoringCard;