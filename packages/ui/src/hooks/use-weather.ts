"use client";

import { useEffect, useState } from "react";

export type WeatherData = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  weatherCode: number;
  isDay: boolean;
};

export function useWeather(lat: number | null, lon: number | null) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (lat === null || lon === null) return;

    let cancelled = false;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const result = await response.json();
        if (cancelled) return;
        setData({
          temperature: Math.round(result.current.temperature_2m),
          humidity: result.current.relative_humidity_2m,
          windSpeed: result.current.wind_speed_10m,
          feelsLike: Math.round(result.current.apparent_temperature),
          weatherCode: result.current.weather_code,
          isDay: result.current.is_day === 1,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Weather unavailable");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  return { data, error, isLoading };
}

/** WMO weather code → short emoji/text glyph. */
export function weatherGlyph(code: number, isDay = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "❄️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}
