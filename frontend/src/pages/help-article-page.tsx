import { useParams, Link } from "react-router"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { helpArticles } from "@/data/help-articles"
import { HelpCard } from "@/components/custom/HelpCard"

export default function HelpArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = helpArticles.find((a) => a.slug === slug) ?? helpArticles[0]

  if (!article) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Article not found</p>
      </div>
    )
  }

  const relatedArticles = helpArticles.filter((a) => article.relatedSlugs.includes(a.slug))

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[720px] px-4">
          <Link
            to="/help"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to Help Center
          </Link>

          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>

          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{article.title}</h1>

          <div className="mt-8 space-y-5">
            {article.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <>
          <Separator />
          <section className="py-14">
            <div className="mx-auto max-w-[720px] px-4">
              <h2 className="mb-5 text-xl font-bold text-foreground">Related Articles</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <HelpCard
                    key={related.slug}
                    icon={related.icon}
                    title={related.title}
                    description={related.description}
                    slug={related.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
