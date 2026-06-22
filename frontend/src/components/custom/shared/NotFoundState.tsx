import { FileSearch } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface NotFoundStateProps {
  message?: string
  description?: string
  action?: ReactNode
}

export function NotFoundState({ message = "Page not found", description = "The resource you're looking for doesn't exist or has been removed.", action }: NotFoundStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-8">
      <Card className="rounded-2xl max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center pt-8 pb-8">
          <FileSearch className="size-12 text-muted-foreground/50 mb-4" strokeWidth={1} />
          <h2 className="text-lg font-semibold mb-1">{message}</h2>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>
          {action ?? (
            <Button variant="outline" render={<Link to="/" />}>
              Go Home
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
