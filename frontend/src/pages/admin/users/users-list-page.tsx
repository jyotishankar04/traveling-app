import { useState, useMemo } from "react"
import { Link } from "react-router"
import { Search, Download, Plus, Eye, Ban, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminDataTable } from "@/components/custom/admin/AdminDataTable"
import { AdminUserStatusBadge } from "@/components/custom/admin/AdminStatusBadges"
import { TableSkeleton } from "@/components/custom/admin/LoadingSkeleton"
import { EmptyState } from "@/components/custom/admin/EmptyState"
import { adminUsers } from "@/data/admin/admin-users"

const ITEMS_PER_PAGE = 10

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

const statuses = ["all", "active", "suspended", "unverified"] as const
const tiers = ["all", "bronze", "silver", "gold", "platinum"] as const

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [statusTab, setStatusTab] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading] = useState(false)

  const filtered = useMemo(() => {
    let result = [...adminUsers]

    if (statusTab !== "all") {
      result = result.filter((u) => u.status === statusTab)
    }

    if (tierFilter !== "all") {
      result = result.filter((u) => u.membershipTier === tierFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q),
      )
    }

    return result
  }, [search, statusTab, tierFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleTabChange = (v: string) => {
    setStatusTab(v)
    setCurrentPage(1)
  }

  const getPaginationItems = () => {
    const items: (number | "ellipsis")[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) items.push(i)
    } else {
      items.push(1)
      if (currentPage > 3) items.push("ellipsis")
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) items.push(i)
      if (currentPage < totalPages - 2) items.push("ellipsis")
      items.push(totalPages)
    }
    return items
  }

  return (
    <div>
      <AdminPageHeader title="Users" subtitle="Manage customer accounts and monitor user activity across the platform.">
        <Button variant="outline" size="sm">
          <Download className="mr-2 size-4" />
          Export
        </Button>
        <Button size="sm">
          <Plus className="mr-2 size-4" />
          Add User
        </Button>
      </AdminPageHeader>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, country..."
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v ?? "all"); setCurrentPage(1) }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Membership Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              {tiers.slice(1).map((t) => (
                <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={statusTab} onValueChange={handleTabChange}>
        <TabsList variant="line" className="mb-4">
          {statuses.map((s) => (
            <TabsTrigger key={s} value={s} className="capitalize">{s}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={statusTab}>
          {loading ? (
            <TableSkeleton rows={8} columns={10} />
          ) : paginated.length === 0 ? (
            <EmptyState
              title="No users found"
              description={search ? "Try adjusting your search or filter criteria." : "No users match the selected status."}
            />
          ) : (
            <>
              <AdminDataTable headers={["User", "Email", "Phone", "Country", "Bookings", "Spent", "Tier", "Status", "Joined", "Actions"]}>
                {paginated.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <Link to={`/admin/users/${user.id}`} className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.id}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.country}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{user.totalBookings}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{formatCurrency(user.totalSpent)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={user.membershipTier === "platinum" ? "default" : user.membershipTier === "gold" ? "success" : "secondary"}
                        className="capitalize"
                      >
                        {user.membershipTier}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <AdminUserStatusBadge status={user.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{user.joinDate}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="size-8">
                            <ChevronDown className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem render={<Link to={`/admin/users/${user.id}`} />}>
                            <Eye className="mr-2 size-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="mr-2 size-4" />
                            {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 size-4" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </AdminDataTable>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} users
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)) }}
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {getPaginationItems().map((item, idx) =>
                      item === "ellipsis" ? (
                        <PaginationItem key={`e-${idx}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={item}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === item}
                            onClick={(e) => { e.preventDefault(); setCurrentPage(item) }}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)) }}
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
