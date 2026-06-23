/**
 * Shared user roles used by the auth store and route guards.
 *
 * Kept in its own tiny module so `ProtectedRoute` can import it without
 * pulling in the whole auth service later. See `09-data-models.md` for the
 * full enum mapping.
 */
export type UserRole = "guest" | "customer" | "owner" | "admin"