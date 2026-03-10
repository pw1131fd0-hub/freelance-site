import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      <nav className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm font-bold hover:text-blue-600 dark:hover:text-blue-400">
          ← Back to Insights
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
            <time>{post.date}</time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-strong:text-black dark:prose-strong:text-white leading-relaxed">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('# ')) return <h1 key={i}>{para.replace('# ', '')}</h1>;
            if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>;
            if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) return (
              <ul key={i} className="list-decimal pl-6 my-4 space-y-2">
                {para.split('\n').map((li, j) => <li key={j}>{li.replace(/^\d+\. /, '')}</li>)}
              </ul>
            );
            return <p key={i}>{para}</p>;
          })}
        </div>
      </article>
    </main>
  );
}
