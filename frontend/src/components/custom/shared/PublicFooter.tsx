import { Link } from "react-router"
import { Building2, Globe, MessageCircle, Camera, Music, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

const footerLinkGroups: Record<string, { label: string; to: string }[]> = {
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Press", to: "#" },
  ],
  Support: [
    { label: "Help Center", to: "/help" },
    { label: "Contact Us", to: "/contact" },
    { label: "Returns", to: "#" },
    { label: "FAQ", to: "/help" },
  ],
  Resources: [
    { label: "Travel Guide", to: "/help" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Cookie Policy", to: "#" },
  ],
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-neutral-950">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white">
                <Building2 className="size-4 text-neutral-900" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">Horizoné</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Curated stays. Unforgettable experiences. Handpicked hotels, villas, apartments, resorts and cottages around the world.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Globe, MessageCircle, Camera, Music].map((Icon, i) => (
                <button
                  key={i}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinkGroups).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white">{heading}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/50 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">&copy; 2026 Horizoné. All rights reserved.</p>
          <div className="flex max-w-xs items-center gap-2">
            <InputGroup className="h-9 rounded-full border-white/10 bg-white/10 shadow-none">
              <InputGroupInput
                placeholder="Your email"
                className="text-xs text-white placeholder:text-white/35"
              />
              <InputGroupAddon align="inline-end">
                <Send className="size-3.5 text-white/50" />
              </InputGroupAddon>
            </InputGroup>
            <Button className="h-9 rounded-full bg-white px-3 text-xs font-semibold text-neutral-900 shadow-none hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
