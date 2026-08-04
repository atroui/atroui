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
        "overflow-x-auto rounded-2xl border border-neutral-200/80",
        className
      )}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b border-neutral-200/80 bg-[#f7f8fa]">
          <tr>
            <th className="px-4 py-3 text-[12px] font-semibold text-neutral-500">Prop</th>
            <th className="px-4 py-3 text-[12px] font-semibold text-neutral-500">Type</th>
            <th className="px-4 py-3 text-[12px] font-semibold text-neutral-500">Default</th>
            <th className="px-4 py-3 text-[12px] font-semibold text-neutral-500">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-3 font-mono text-[12px] font-medium text-neutral-950">
                {row.name}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] text-neutral-500">{row.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-neutral-400">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-[13px] text-neutral-500">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
