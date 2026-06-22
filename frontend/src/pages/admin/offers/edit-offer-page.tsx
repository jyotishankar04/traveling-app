import { useState } from "react"
import { Link, useParams } from "react-router"
import { Upload, Save, X, Ban, TrendingUp, DollarSign, Hash } from "lucide-react"

import { NotFoundState } from "@/components/custom/shared/NotFoundState"
import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { AdminOfferBadge } from "@/components/custom/admin/AdminStatusBadges"
import { AdminStatCard } from "@/components/custom/admin/AdminStatCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { adminOffers } from "@/data/admin/admin-offers"
import { adminDestinations } from "@/data/admin/admin-destinations"

export default function AdminEditOfferPage() {
  const { offerId } = useParams()
  const offer = adminOffers.find((o) => o.id === offerId)
  if (!offer) return <NotFoundState />

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [applyToAll, setApplyToAll] = useState(false)

  function toggleDestination(id: string) {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <AdminPageHeader title="Edit Offer" subtitle={`Editing ${offer.id}`}>
        <AdminOfferBadge status={offer.status} />
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Redemptions"
          value={String(offer.usageCount)}
          change="+5.2% this week"
          changePositive
          icon={<Hash className="size-4" />}
        />
        <AdminStatCard
          label="Revenue Generated"
          value={`$${(offer.usageCount * (offer.discountType === "fixed" ? offer.discount : Math.min(offer.discount * 0.01 * offer.minBookingAmount, offer.maxDiscount))).toLocaleString()}`}
          change="+3.8%"
          changePositive
          icon={<DollarSign className="size-4" />}
        />
        <AdminStatCard
          label="Conversion Rate"
          value="12.4%"
          change="+1.1 pp"
          changePositive
          icon={<TrendingUp className="size-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Offer Title</label>
                <Input defaultValue={offer.title} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Offer Type</label>
                <Select defaultValue={offer.offerType} onValueChange={(v) => v}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="flash">Flash Sale</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="loyalty">Loyalty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Description</label>
                <Textarea
                  defaultValue={offer.description}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea
                  defaultValue={`${offer.description}\n\nTerms & Conditions apply. Minimum booking amount of $${offer.minBookingAmount}. Maximum discount of $${offer.maxDiscount}.`}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discount Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <Select defaultValue={offer.discountType} onValueChange={(v) => v}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Value</label>
                  <Input type="number" defaultValue={offer.discount} min={0} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Discount</label>
                  <Input type="number" defaultValue={offer.maxDiscount} min={0} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Booking Amount</label>
                  <Input type="number" defaultValue={offer.minBookingAmount} min={0} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch checked={applyToAll} onCheckedChange={setApplyToAll} />
                <label className="text-sm font-medium">Apply to all hotels</label>
              </div>
              {!applyToAll && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selected Destinations</label>
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3">
                    {adminDestinations.map((d) => (
                      <label key={d.id} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={selectedDestinations.includes(d.id)}
                          onCheckedChange={() => toggleDestination(d.id)}
                        />
                        {d.name}, {d.country}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Membership Tier</label>
                <Select defaultValue={offer.membershipTier} onValueChange={(v) => v}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" defaultValue={offer.startDate} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" defaultValue={offer.endDate} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Limit</label>
                <Input type="number" defaultValue={offer.usageLimit || ""} min={0} placeholder="Unlimited" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offer Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 p-10 transition-colors hover:bg-muted/40">
                <Upload className="mb-2 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG or WebP — Recommended size 1200x800
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border">
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${offer.image})` }}
                />
                <div className="space-y-3 p-4">
                  <p className="text-sm font-semibold text-foreground">{offer.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">
                      {offer.discountType === "percentage" ? `${offer.discount}% OFF` : `$${offer.discount} OFF`}
                    </Badge>
                    <Badge variant="outline" className="capitalize">{offer.offerType}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(offer.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {" — "}
                    {new Date(offer.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: <AdminOfferBadge status={offer.status} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{offer.offerType}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium">
                  {offer.discountType === "percentage" ? `${offer.discount}%` : `$${offer.discount}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{Math.ceil((new Date(offer.endDate).getTime() - new Date(offer.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium capitalize">{offer.membershipTier}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Usage</span>
                <span className="font-medium">{offer.usageCount}/{offer.usageLimit || "∞"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <Link to="/admin/offers">
          <Button variant="ghost">
            <X className="size-4" />
            Cancel
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="destructive">
            <Ban className="size-4" />
            Disable Offer
          </Button>
          <Button variant="outline">
            <Save className="size-4" />
            Save Changes
          </Button>
          <Button>
            <Save className="size-4" />
            Publish Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
