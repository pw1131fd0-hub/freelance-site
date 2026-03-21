import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      i++;
      continue; // skip top-level h1 (already shown as article title)
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-slate-100"
        >
          {line.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="text-base font-bold mt-6 mb-2 text-slate-800 dark:text-slate-200"
        >
          {line.replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }
    // numbered list block
    if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="list-decimal pl-6 my-4 space-y-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed"
        >
          {listItems.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: boldify(item) }} />
          ))}
        </ol>
      );
      continue;
    }
    // bullet list
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="list-disc pl-6 my-4 space-y-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed"
        >
          {listItems.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: boldify(item) }} />
          ))}
        </ul>
      );
      continue;
    }
    // empty line
    if (line.trim() === "") {
      i++;
      continue;
    }
    // regular paragraph
    elements.push(
      <p
        key={i}
        className="text-base text-slate-600 dark:text-slate-300 leading-relaxed my-4"
        dangerouslySetInnerHTML={{ __html: boldify(line) }}
      />
    );
    i++;
  }

  return elements;
}

function boldify(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-sm font-mono text-slate-700 dark:text-slate-300">$1</code>');
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={14} />
          Back to Insights
        </Link>

        <article className="bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-12 border border-slate-100 dark:border-white/[0.05]">
          <header className="mb-10 pb-8 border-b border-slate-100 dark:border-white/[0.05]">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
              {post.title}
            </h1>
            <time className="text-xs font-mono text-slate-400">{post.date}</time>
          </header>

          <div className="prose-custom">{renderContent(post.content)}</div>
        </article>

        <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-mono">
          <Link
            href="/blog"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← All posts
          </Link>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            Work with me →
          </Link>
        </footer>
      </div>
    </main>
  );
}
