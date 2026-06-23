# Backend integration plan

This document defines how the Horizoné frontend connects to the backend.
It covers the API client, auth token handling, error interceptors,
TanStack Query structure, mutations, file uploads, validation, and
environment variables.

The backend stack is Node.js + Express + Prisma + PostgreSQL, with JWT
access and refresh tokens stored client-side.

## API service layer design

The frontend adds a `src/services/` folder. Pages never call `fetch`
directly. They call service functions, which go through one shared API
client.

```txt
src/services/
  api-client.ts
  auth.service.ts
  hotels.service.ts
  rooms.service.ts
  bookings.service.ts
  profile.service.ts
  owner.service.ts
  admin.service.ts
  uploads.service.ts
```

## API client setup

`api-client.ts` configures a single fetch or axios instance. Responsibilities:

- Prefix every request with `VITE_API_BASE_URL` (default `/api/v1`).
- Attach the `Authorization: Bearer <accessToken>` header from the auth
  store.
- Parse the `ApiResponse<T>` envelope and return `data` on success.
- Throw a typed `ApiError` on failure.
- Wrap errors so callers can switch on `error.code`.

```ts
import { useAuthStore } from "@/stores/auth-store";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export class ApiError extends Error {
  constructor(public code: string, message: string, public status: number, public field?: string) {
    super(message);
  }
}

export async function apiRequest<T>(method: string, path: string, body?: unknown): Promise<T> {
  const { accessToken } = useAuthStore.getState();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    throw new ApiError(json.error?.code ?? "UNKNOWN", json.message, res.status, json.error?.field);
  }
  return json.data as T;
}
```

## Auth token handling

The auth store holds `accessToken`, `refreshToken`, and `user`. On app
load, the store rehydrates from `localStorage`. The `ProtectedRoute`
component checks `isAuthenticated`.

- On login and refresh, the store saves both tokens.
- The API client adds the access token to every request.
- On logout, the store clears tokens and `localStorage`.

## Error interceptor (refresh on 401)

When the API client receives a 401, it tries to refresh once:

1. Call `auth.service.refresh()` with the stored refresh token.
2. If it succeeds, save the new tokens and retry the original request.
3. If it fails, clear the auth store and redirect to `/auth/login`.

Use a mutex flag to avoid multiple concurrent refresh calls. If the
refresh call itself returns 401, stop refreshing immediately.

## Request and response typing

Every service function returns the typed data from the `ApiResponse<T>`
envelope. Lists return the `items` array plus pagination metadata. The
`PaginatedResponse<T>` helper unwraps both.

```ts
export const HotelsService = {
  list: (params: HotelQuery) => apiRequest<PaginatedData<Hotel>>("GET", `/hotels?${toQuery(params)}`),
  get: (slug: string) => apiRequest<HotelDetail>("GET", `/hotels/${slug}`),
};
```

## TanStack Query structure

Wrap the app in `QueryClientProvider` from `app/providers.tsx`. Use
`useQuery` for reads and `useMutation` for writes.

### Query key conventions

Query keys are arrays starting with the module name:

- `["hotels", filters]`
- `["hotel", slug]`
- `["profile", "bookings", status]`
- `["owner", "hotels"]`
- `["admin", "hotels", "pending"]`
- `["admin", "dashboard"]`

### Example hooks

```ts
export function useHotels(filters: HotelQuery) {
  return useQuery({ queryKey: ["hotels", filters], queryFn: () => HotelsService.list(filters) });
}

export function useCreateHotel() {
  return useMutation({
    mutationFn: (input: CreateHotelInput) => OwnerHotelsService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["owner", "hotels"] }),
  });
}
```

## Mutation patterns

- Optimistic updates for simple toggles (for example, wishlist add).
  Roll back on error.
- Pessimistic updates for booking and payment (wait for success before
  navigating to the result page).
- Always invalidate the affected list keys on success.
- Show a toast on error with `error.code`.

## File upload plan

Image uploads use a separate endpoint because they are multipart:

- `POST /api/v1/uploads` accepts `multipart/form-data` and returns a URL.
- The owner gallery and admin hotel pages upload first, then send the
  returned URL in the `PATCH .../gallery` payload.

The upload endpoint uses the abstract blob store slot. When wired for
real, it points to S3, GCS, or a compatible provider. The frontend uses
the same service regardless of the backing store.

```ts
export const UploadsService = {
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return apiRequest<{ url: string; id: string }>("POST", "/uploads", form, true);
  },
};
```

The API client must skip `Content-Type: application/json` for
multipart requests and let the browser set the boundary.

## Form validation with Zod

Define Zod schemas in `src/types/` next to the interfaces. The schemas
are the single source of truth for both the frontend forms and the
backend route validation.

```ts
export const createHotelSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(1),
  country: z.string().min(1),
  propertyType: z.string(),
  starRating: z.number().int().min(1).max(5),
  images: z.array(z.string().url()).min(1),
});
```

Forms use `react-hook-form` with `zodResolver`. The backend import the
same schemas (or generates them) so the validation rules match.

## Backend module mapping

Each frontend service maps to one backend module:

| Frontend service | Backend module |
|---|---|
| `auth.service.ts` | `modules/auth` |
| `hotels.service.ts` | `modules/hotels` |
| `rooms.service.ts` | `modules/rooms` |
| `bookings.service.ts` | `modules/bookings` |
| `profile.service.ts` | `modules/users` |
| `owner.service.ts` | `modules/owner` (+ `rooms`, `bookings`, `reviews`, `payments`) |
| `admin.service.ts` | `modules/admin` |
| `uploads.service.ts` | `modules/uploads` |

## Environment variables

The frontend needs these at build time (Vite `VITE_` prefix):

```bash
VITE_API_BASE_URL=https://api.horizone.app/api/v1
VITE_UPLOADS_URL=https://api.horizone.app/api/v1/uploads
VITE_MAPS_API_KEY=          # for a future real map
VITE_PAYMENT_PROVIDER_KEY=  # publishable key for the payment provider
```

The backend reads (server-side only):

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/horizone
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=30d
PAYMENT_PROVIDER_SECRET=...
BLOB_STORE_BUCKET=...
BLOB_STORE_KEY=...
MAIL_SERVICE_API_KEY=...
CORS_ORIGIN=http://localhost:5173
```

## Migration order

1. Add `src/types/` with the shared interfaces and Zod schemas.
2. Add `src/services/api-client.ts` with the refresh interceptor.
3. Add stub service files that still read mock data, so pages can import
   from services with no behavior change.
4. Swap each page from direct mock imports to service calls behind
   `useQuery`, one module at a time.
5. Wire auth, then bookings, then owner, then admin.
6. Remove mock data once a module is fully on real data.

## Next steps

See `21-testing-plan.md` for how to test this layer, and
`22-deployment-plan.md` for shipping it.