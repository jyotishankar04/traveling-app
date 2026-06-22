import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronRight } from "lucide-react"
import { currentUser } from "@/data/users"

export default function EditProfilePage() {
  const u = currentUser

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
        <span>/</span>
        <span className="text-foreground">Edit Profile</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>

      <div className="rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">Personal information</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Full name</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.name} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.email} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Phone</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.phone} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Date of birth</FieldLabel>
            <FieldContent>
              <Input type="date" defaultValue={u.dateOfBirth} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Nationality</FieldLabel>
            <FieldContent>
              <Select defaultValue={u.nationality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={u.nationality}>{u.nationality}</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Gender</FieldLabel>
            <FieldContent>
              <Select defaultValue="Male">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">Profile photo</h2>
        <div className="mt-4 flex items-center gap-4">
          <Avatar size="lg"><AvatarImage src={u.avatar} alt={u.name} /><AvatarFallback>AT</AvatarFallback></Avatar>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full text-xs" size="sm">Upload photo</Button>
            <Button variant="ghost" className="rounded-full text-xs text-muted-foreground" size="sm">Remove</Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">Address</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <Field>
              <FieldLabel>Street address</FieldLabel>
              <FieldContent>
                <Input defaultValue={u.address.street} />
              </FieldContent>
            </Field>
          </div>
          <Field>
            <FieldLabel>City</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.address.city} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>State/Province</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.address.state} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>ZIP/Postal code</FieldLabel>
            <FieldContent>
              <Input defaultValue={u.address.zip} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Country</FieldLabel>
            <FieldContent>
              <Select defaultValue={u.address.country}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={u.address.country}>{u.address.country}</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link to="/profile">
          <Button variant="outline" className="rounded-full px-6">Cancel</Button>
        </Link>
        <Button className="rounded-full px-6">
          Save changes
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
