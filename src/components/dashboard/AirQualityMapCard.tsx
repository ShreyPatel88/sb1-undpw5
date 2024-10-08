import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AirQualityMapCard: React.FC = () => {
  return (
    <Card className="bg-white md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Air Quality Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted h-40 sm:h-64 rounded-md flex items-center justify-center text-muted-foreground">
          Air Quality Map Placeholder
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityMapCard;