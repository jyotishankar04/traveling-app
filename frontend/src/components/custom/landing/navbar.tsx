import { Link } from "react-router"
import { Building2, Globe2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

const navLinks = [
  { name: "Hotels", href: "/hotels" },
  { name: "Destinations", href: "/destinations" },
  { name: "Offers", href: "/offers" },
  { name: "About", href: "/about" },
  { name: "Help", href: "/help" },
]

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-[1200px] items-center justify-between rounded-full bg-neutral-900/80 px-5 py-2 backdrop-blur-xl border border-white/[0.06] shadow-lg shadow-black/20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Building2 className="size-5 text-white" />
          <span className="text-lg font-semibold tracking-tight text-white">
            Horizoné
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xl:block">
            <InputGroup className="h-8 w-40 rounded-full border-white/10 bg-white/10 shadow-none">
              <InputGroupAddon>
                <Search className="size-3.5 text-white/50" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search destinations..."
                className="text-xs text-white placeholder:text-white/35"
              />
            </InputGroup>
          </div>

          <button className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white md:flex">
            <Globe2 className="size-3.5" />
            EN
          </button>

          <Button
            variant="ghost"
            className="rounded-full px-4 text-sm text-white/75 hover:bg-white/10 hover:text-white"
            render={<Link to="/auth/login" />}
          >
            Log in
          </Button>

          <Button className="rounded-full bg-white px-4 text-sm font-medium text-neutral-900 shadow-none hover:bg-white/90" render={<Link to="/auth/register" />}>
            Sign up
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
