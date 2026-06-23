import { useState, useMemo } from "react"
import {
  Search,
  Download,
  Eye,
  Ban,
  Mail,
  MoreHorizontal,
  Building2,
  UserCheck,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  AdminPageHeader,
} from "@/components/custom/admin/AdminPageHeader"
import {
  AdminStatCard,
} from "@/components/custom/admin/AdminStatCard"
import {
  AdminDataTable,
} from "@/components/custom/admin/AdminDataTable"
import {
  AdminOwnerVerificationBadge,
  AdminOwnerAccountBadge,
} from "@/components/custom/admin/AdminStatusBadges"
import {
  EmptyState,
} from "@/components/custom/admin/EmptyState"
import {
  TableSkeleton,
} from "@/components/custom/admin/LoadingSkeleton"
import {
  adminOwners,
} from "@/data/admin/admin-owners"

const ITEMS_PER_PAGE = 8

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function AdminOwnersPage() {
  const [search, setSearch] = useState("")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [accountTab, setAccountTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading] = useState(false)

  const countries = useMemo(() => {
    const set = new Set(adminOwners.map((o) => o.country))
    return Array.from(set).sort()
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminOwners]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (o) =>
          o.ownerName.toLowerCase().includes(q) ||
          o.businessName.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q)
      )
    }

    if (verificationFilter !== "all") {
      result = result.filter((o) => o.verificationStatus === verificationFilter)
    }

    if (countryFilter !== "all") {
      result = result.filter((o) => o.country === countryFilter)
    }

    if (accountTab === "active") {
      result = result.filter((o) => o.accountStatus === "active")
    } else if (accountTab === "suspended") {
      result = result.filter((o) => o.accountStatus === "suspended")
    }

    return result
  }, [search, verificationFilter, countryFilter, accountTab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalOwners = adminOwners.length
  const verified = adminOwners.filter((o) => o.verificationStatus === "verified").length
  const pendingVerification = adminOwners.filter((o) => o.verificationStatus === "pending").length

  const pendingQueue = adminOwners.filter((o) => o.verificationStatus === "pending")

  const totalRevenue = adminOwners.reduce((sum, o) => sum + o.totalRevenue, 0)

  return (
    <div>
      <AdminPageHeader title="Hotel Owners" subtitle="Manage and review hotel owner accounts">
        <Button variant="outline">
          <Download className="size-4" />
          Export
        </Button>
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard
          label="Total Owners"
          value={totalOwners.toString()}
          icon={<Users className="size-4" />}
        />
        <AdminStatCard
          label="Verified"
          value={verified.toString()}
          change={`${((verified / totalOwners) * 100).toFixed(0)}% of total`}
          changePositive
          icon={<UserCheck className="size-4" />}
        />
        <AdminStatCard
          label="Pending Verification"
          value={pendingVerification.toString()}
          icon={<Clock className="size-4" />}
        />
        <AdminStatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<Building2 className="size-4" />}
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search owners..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <Select
          value={verificationFilter}
          onValueChange={(v) => {
            setVerificationFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={countryFilter}
          onValueChange={(v) => {
            setCountryFilter(v ?? "all")
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        defaultValue="all"
        value={accountTab}
        onValueChange={(v) => {
          setAccountTab(v ?? "all")
          setCurrentPage(1)
        }}
        className="mb-6"
      >
        <TabsList variant="line">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>
      </Tabs>

      {pendingQueue.length > 0 && (
        <Card className="mb-6 border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
              <UserPlus className="size-4" />
              Approval Queue
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-500">
              {pendingQueue.length} owner{pendingQueue.length !== 1 ? "s" : ""} pending verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingQueue.map((owner) => (
                <div
                  key={owner.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-white p-3 dark:border-amber-800 dark:bg-amber-950/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(owner.ownerName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{owner.ownerName}</p>
                      <p className="text-xs text-muted-foreground">{owner.businessName} &middot; {owner.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
                      <CheckCircle className="size-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30">
                      <XCircle className="size-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <TableSkeleton rows={6} columns={9} />
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No owners found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <>
          <AdminDataTable
            headers={[
              "Owner",
              "Business Name",
              "Email",
              "Country",
              "Hotels",
              "Revenue",
              "Verification",
              "Account",
              "Joined",
              "",
            ]}
          >
            {paginated.map((owner) => (
              <tr key={owner.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(owner.ownerName)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{owner.ownerName}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{owner.businessName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{owner.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{owner.country}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">{owner.hotelsCount}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                  {formatCurrency(owner.totalRevenue)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <AdminOwnerVerificationBadge status={owner.verificationStatus} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <AdminOwnerAccountBadge status={owner.accountStatus} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(owner.joinDate)}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => {}}>
                        <Eye className="size-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => {}}>
                        <Ban className="size-4" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => {}}>
                        <Mail className="size-4" />
                        Send Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </AdminDataTable>

          <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing {paginated.length} of {filtered.length} owner{filtered.length !== 1 ? "s" : ""}
            </p>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(i + 1)
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </div>
  )
}
