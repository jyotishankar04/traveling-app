import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { NotFoundState } from "@/components/custom/shared/NotFoundState"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="text-center">
        <p className="text-7xl font-bold tracking-tight text-foreground">404</p>
        <NotFoundState
          message="Page not found"
          description="The page you're looking for doesn't exist or may have moved."
          action={
            <Button render={<Link to="/" />}>Back to home</Button>
          }
        />
      </div>
    </div>
  )
}