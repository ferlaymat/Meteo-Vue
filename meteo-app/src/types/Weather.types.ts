export interface Weather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
}

export type TemperatureUnit = "C" | "F";
