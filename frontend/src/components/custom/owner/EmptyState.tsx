import { Package, type LucideIcon } from "lucide-react"
import { SharedEmptyState } from "@/components/custom/shared/StateViews"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

// Thin wrapper over the shared empty state, keeping the owner default icon.
export function EmptyState({ icon: Icon = Package, title, description, action }: EmptyStateProps) {
  return <SharedEmptyState icon={Icon} title={title} description={description} action={action} />
}