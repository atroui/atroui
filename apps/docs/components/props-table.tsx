import { cn } from "@meridian/ui"

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
}

interface PropsTableProps {
  data: PropRow[]
  className?: string
}

export function PropsTable({ data, className }: PropsTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border", className)}>
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b last:border-0">
              <td className="px-4 py-3 font-mono text-xs text-primary">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.type}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
