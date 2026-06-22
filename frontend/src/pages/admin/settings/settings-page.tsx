import { AdminPageHeader } from "@/components/custom/admin/AdminPageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Platform Settings"
        subtitle="Configure internal platform settings"
      />

      <Tabs defaultValue="general">
        <TabsList variant="line" className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Platform Name</FieldLabel>
                  <FieldContent>
                    <Input defaultValue="Horizoné" />
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Support Email</FieldLabel>
                  <FieldContent>
                    <Input type="email" defaultValue="support@horizone.com" />
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Default Currency</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="USD" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Default Language</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="en" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Maintenance Mode</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={false} />
                      <FieldDescription>
                        When enabled, the platform will display a maintenance page to all visitors
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Service Fee (%)</FieldLabel>
                  <FieldContent>
                    <Input type="number" defaultValue={12.5} min={0} step={0.1} />
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Cancellation Rules</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="moderate" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Determines the default cancellation policy for all bookings
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Auto-confirm Bookings</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Automatically confirm bookings without manual owner approval
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Max Guests Per Booking</FieldLabel>
                  <FieldContent>
                    <Input type="number" defaultValue={12} min={1} />
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Payment Provider</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="stripe" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Payout Schedule</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="weekly" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Platform Commission (%)</FieldLabel>
                  <FieldContent>
                    <Input type="number" defaultValue={15} min={0} step={0.5} />
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Tax Settings</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="automatic" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Automatic applies VAT/GST based on customer location
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Verification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Require Owner KYC</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Owners must complete identity verification before listing hotels
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Require Hotel Approval</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        New hotel submissions require admin approval before going live
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Required Documents</FieldLabel>
                  <FieldContent>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox defaultChecked />
                        ID Proof (Passport or National ID)
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox defaultChecked />
                        Business License or Registration
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox defaultChecked />
                        Property Insurance Certificate
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox defaultChecked />
                        Tax Registration Document
                      </label>
                    </div>
                    <FieldDescription>
                      Documents required from hotel owners for verification
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Email Alerts</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Send email notifications for system events
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Admin Alerts</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        New registrations, flagged reviews, payment failures, system errors
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Owner Alerts</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        New bookings, cancellations, review notifications, payout confirmations
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Customer Alerts</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Booking confirmations, reminders, review invitations, promotional offers
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel>Admin Two-Factor Authentication</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Require 2FA for all admin account access
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Session Timeout</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="30" onValueChange={(v) => v}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Minutes</SelectItem>
                        <SelectItem value="60">1 Hour</SelectItem>
                        <SelectItem value="120">2 Hours</SelectItem>
                        <SelectItem value="240">4 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Automatically log out inactive admin sessions
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>IP Allowlist</FieldLabel>
                  <FieldContent>
                    <Textarea
                      defaultValue="192.168.1.0/24,10.0.0.0/8,203.0.113.0/24"
                      rows={3}
                    />
                    <FieldDescription>
                      Comma-separated IP ranges allowed to access the admin panel
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Separator />
                <Field orientation="responsive">
                  <FieldLabel>Audit Logging</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <FieldDescription>
                        Log all admin actions for compliance and security review
                      </FieldDescription>
                    </div>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex items-center justify-end border-t border-border pt-6">
        <Button>
          <Save className="size-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
