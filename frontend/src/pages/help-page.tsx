import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { helpArticles, type HelpArticle } from "@/data/help-articles"
import { HelpCard } from "@/components/custom/HelpCard"
import { Mail, Phone } from "lucide-react"

const categoryOrder = ["Getting Started", "Bookings", "Payments", "Account", "Cancellations", "Hosts"]

function groupByCategory(articles: HelpArticle[]): Map<string, HelpArticle[]> {
  const groups = new Map<string, HelpArticle[]>()
  for (const article of articles) {
    const existing = groups.get(article.category) ?? []
    existing.push(article)
    groups.set(article.category, existing)
  }
  return groups
}

export default function HelpPage() {
  const grouped = groupByCategory(helpArticles)

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">Help Center</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Find answers to common questions and learn how to make the most of Horizoné.
          </p>
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="h-12 rounded-xl border-border bg-white pl-10 text-sm shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="mx-auto max-w-[1000px] px-4">
          {categoryOrder.map((category) => {
            const articles = grouped.get(category)
            if (!articles || articles.length === 0) return null

            return (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="mb-5 text-xl font-bold text-foreground">{category}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <HelpCard
                      key={article.slug}
                      icon={article.icon}
                      title={article.title}
                      description={article.description}
                      slug={article.slug}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Separator />

      <section className="py-14">
        <div className="mx-auto max-w-[600px] px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">Still need help?</h2>
          <p className="mt-2 text-muted-foreground">Contact our support team</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="mailto:support@horizone.com" className="text-foreground underline underline-offset-2 hover:text-primary">
              support@horizone.com
            </a>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <a href="tel:+15559876543" className="text-foreground underline underline-offset-2 hover:text-primary">
              +1 (555) 987-6543
            </a>
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="mailto:support@horizone.com">
              <Button variant="outline" className="h-11 gap-2 rounded-xl px-5">
                <Mail className="size-4" />
                Email Us
              </Button>
            </a>
            <a href="tel:+15559876543">
              <Button className="h-11 gap-2 rounded-xl px-5">
                <Phone className="size-4" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
