import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export default function Blog() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      <nav className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-sm font-bold hover:text-blue-600 dark:hover:text-blue-400">
          ← Back to Home
        </Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h1 className="text-4xl font-bold mb-12 tracking-tight">Thoughts & Insights</h1>
        
        <div className="space-y-16">
          {blogPosts.map((post) => (
            <div key={post.slug} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4 decoration-1 decoration-gray-300 dark:decoration-gray-700 hover:decoration-blue-600 transition-all"
                >
                  {post.title}
                </Link>
                <time className="text-sm font-mono text-gray-500 mt-1 md:mt-0">
                  {post.date}
                </time>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl text-lg leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono text-gray-400">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag.toLowerCase()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
