import type { ReactNode } from "react"

interface TimelineItemProps {
  year: string
  title: string
  description: string
}

export function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <div className="flex mb-8 last:mb-0">
      <div className="flex flex-col items-center mr-4">
        <div className="w-1 h-full bg-gray-300"></div>
        <div className="w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
      </div>
      <div>
        <span className="text-sm font-medium text-primary">{year}</span>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

interface TimelineProps {
  children: ReactNode
}

export function Timeline({ children }: TimelineProps) {
  return <div className="relative pl-4">{children}</div>
}

