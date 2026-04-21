//We define here all possible values to avoid a list of if
const ICON_MAP: Record<string, string> = {
  "01d": "clear sky",
  "01n": "clear sky",
  "02d": "few clouds",
  "02n": "few clouds",
  "03d": "scattered clouds",
  "03n": "scattered clouds",
  "04d": "broken clouds",
  "04n": "broken clouds",
  "09d": "shower rain",
  "09n": "shower rain",
  "10d": "rain",
  "10n": "rain",
  "11d": "thunderstorm",
  "11n": "thunderstorm",
  "13d": "snow",
  "13n": "snow",
  "50d": "mist",
  "50n": "mist",
};

export function getIconLabel(iconCode: string): string {
  return ICON_MAP[iconCode] || "unknown";
}
