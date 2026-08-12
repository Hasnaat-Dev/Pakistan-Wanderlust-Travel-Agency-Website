import { createFileRoute, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { getPost } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — Pakistan Wanderlust" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Pakistan Wanderlust` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <header className="relative flex min-h-[52svh] items-end overflow-hidden bg-ink">
        <img src={post.image} alt={post.title} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/35" />
        <div className="relative mx-auto w-full max-w-3xl px-5 pb-12 sm:px-8">
          <p className="eyebrow text-gold">{post.category}</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-semibold text-primary-foreground">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-primary-foreground/70">{post.readTime}</p>
        </div>
      </header>
      <Section className="mx-auto max-w-3xl">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          {post.body.map((para: string) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </Section>
    </article>
  );
}
