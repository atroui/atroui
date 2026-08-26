import { cn } from "@/lib/utils"

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
    <div
      className={cn(
        "overflow-x-auto rounded-lg border border-border-subtle bg-card/40",
        className
      )}
    >
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="border-b border-border-subtle bg-white/[0.03]">
          <tr>
            {["Prop", "Type", "Default", "Description"].map((label) => (
              <th
                key={label}
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.name}
              className="border-b border-border-subtle last:border-0"
            >
              <td className="px-4 py-3 align-top font-mono text-[12px] font-medium text-foreground">
                {row.name}
              </td>
              <td className="px-4 py-3 align-top font-mono text-[12px] text-muted-foreground">
                {row.type}
              </td>
              <td className="px-4 py-3 align-top font-mono text-[12px] text-muted-foreground">
                {row.default ?? "-"}
              </td>
              <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
