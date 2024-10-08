import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InsightsCard: React.FC = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-base text-muted-foreground">
          Based on current conditions, it's advisable to:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm sm:text-base">
          <li>Keep windows closed to maintain good indoor air quality</li>
          <li>Use air purifiers if available</li>
          <li>Stay hydrated and avoid prolonged outdoor activities</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;