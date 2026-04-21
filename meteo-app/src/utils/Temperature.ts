export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatTemp(temp: number, unit: "C" | "F"): string {
  const converted = unit === "F" ? celsiusToFahrenheit(temp) : temp;
  return `${Math.round(converted)}°${unit}`;
}
