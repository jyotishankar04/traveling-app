import type { ReactNode } from "react"
import type { UserRole } from "@/app/auth-types"

/**
 * Route guard scaffold.
 *
 * Today this is a no-op that renders its children, because there is no auth
 * session yet. When the backend integration phase lands, this component will:
 *
 * 1. Read the current user and access token from the auth store.
 * 2. Redirect guests to `/auth/login?redirect=<current path>`.
 * 3. Block users whose role is not in `allowedRoles` and redirect them to
 *    `/403` or their own dashboard.
 * 4. Redirect unverified users to `/auth/verify` unless `requireVerified`
 *    is false.
 *
 * See `19-refactor-plan.md` and `11-authentication-flow.md`.
 */
interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  requireVerified?: boolean
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireVerified = true,
}: ProtectedRouteProps) {
  // TODO: enforce auth and role checks once the auth store exists.
  void allowedRoles
  void requireVerified
  return <>{children}</>
}