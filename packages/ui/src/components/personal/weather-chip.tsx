"use client";

import { useWeather, weatherGlyph } from "../../hooks/use-weather";
import { cn } from "../../lib/utils";

export type WeatherChipProps = {
  lat: number;
  lon: number;
  label?: string;
  className?: string;
};

export function WeatherChip({
  lat,
  lon,
  label,
  className,
}: WeatherChipProps) {
  const { data: weather, isLoading, error } = useWeather(lat, lon);

  if (isLoading) {
    return (
      <span
        className={cn(
          "inline-flex animate-pulse items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
          className,
        )}
        aria-label="Weather loading"
      >
        ···
      </span>
    );
  }

  if (error || !weather) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
          className,
        )}
        aria-label="Weather unavailable"
        title="Weather offline"
      >
        —
      </span>
    );
  }

  const glyph = weatherGlyph(weather.weatherCode, weather.isDay);
  const place = label ?? "Local";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
        className,
      )}
      aria-label={`Weather in ${place}, ${weather.temperature} degrees`}
      title={`${place} · feels ${weather.feelsLike}°`}
    >
      <span aria-hidden>{glyph}</span>
      <span className="text-foreground">{weather.temperature}°</span>
    </span>
  );
}
