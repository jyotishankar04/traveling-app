import { useState } from "react"
import { Link } from "react-router"
import { Upload, Save, Send, X } from "lucide-react"

import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { adminDestinations } from "@/data/admin/admin-destinations"

export default function AdminNewOfferPage() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [applyToAll, setApplyToAll] = useState(false)

  function toggleDestination(id: string) {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <AdminPageHeader title="Create Offer" subtitle="Set up a new promotional offer for your platform" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Offer Title</label>
                <Input placeholder="e.g. Summer in Paris Escape" defaultValue="" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Offer Type</label>
                <Select onValueChange={(v) => v}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select offer type" />
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
                <Textarea placeholder="Brief description shown on offer cards" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea placeholder="Detailed description with terms and conditions" rows={4} />
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
                  <Select onValueChange={(v) => v}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Value</label>
                  <Input type="number" placeholder="20" min={0} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Discount</label>
                  <Input type="number" placeholder="e.g. 400" min={0} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Booking Amount</label>
                  <Input type="number" placeholder="e.g. 500" min={0} />
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
                <Select onValueChange={(v) => v}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All tiers" />
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
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Limit</label>
                <Input type="number" placeholder="Leave empty for unlimited" min={0} />
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
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5" />
                <div className="space-y-3 p-4">
                  <p className="text-sm font-semibold text-foreground">Offer Title</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">20% OFF</Badge>
                    <Badge variant="outline">Seasonal</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jun 01, 2026 — Aug 31, 2026
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: <Badge variant="secondary">Draft</Badge>
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
                <span className="font-medium capitalize">—</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium">—</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">—</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium">All</span>
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
          <Button variant="outline">
            <Save className="size-4" />
            Save as Draft
          </Button>
          <Button>
            <Send className="size-4" />
            Publish Offer
          </Button>
        </div>
      </div>
    </div>
  )
}
