"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Edit lat/lon after install. Open-Meteo — no API key. */
const CONTENT = {
  lat: 40.7128,
  lon: -74.006,
  label: "Local",
}

type WeatherData = {
  temperature: number
  feelsLike: number
  weatherCode: number
  isDay: boolean
}

function weatherGlyph(code: number, isDay = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙"
  if (code <= 3) return "⛅"
  if (code <= 48) return "🌫️"
  if (code <= 67) return "🌧️"
  if (code <= 77) return "🌨️"
  if (code <= 82) return "🌦️"
  if (code <= 86) return "❄️"
  if (code <= 99) return "⛈️"
  return "🌡️"
}

function useWeather(lat: number | null, lon: number | null) {
  const [data, setData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (lat === null || lon === null) return

    let cancelled = false

    const fetchWeather = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,is_day`
        )
        if (!response.ok) throw new Error("Failed to fetch weather data")
        const result = await response.json()
        if (cancelled) return
        setData({
          temperature: Math.round(result.current.temperature_2m),
          feelsLike: Math.round(result.current.apparent_temperature),
          weatherCode: result.current.weather_code,
          isDay: result.current.is_day === 1,
        })
      } catch (err: unknown) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Weather unavailable")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchWeather()
    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { data, error, isLoading }
}

export function WeatherChip({
  lat = CONTENT.lat,
  lon = CONTENT.lon,
  label = CONTENT.label,
  className,
}: {
  lat?: number
  lon?: number
  label?: string
  className?: string
} = {}) {
  const { data: weather, isLoading, error } = useWeather(lat, lon)

  if (isLoading) {
    return (
      <span
        className={cn(
          "inline-flex animate-pulse items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
          className
        )}
        aria-label="Weather loading"
      >
        ···
      </span>
    )
  }

  if (error || !weather) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
          className
        )}
        aria-label="Weather unavailable"
        title="Weather offline"
      >
        —
      </span>
    )
  }

  const glyph = weatherGlyph(weather.weatherCode, weather.isDay)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
        className
      )}
      aria-label={`Weather in ${label}, ${weather.temperature} degrees`}
      title={`${label} · feels ${weather.feelsLike}°`}
    >
      <span aria-hidden>{glyph}</span>
      <span className="text-foreground">{weather.temperature}°</span>
    </span>
  )
}
