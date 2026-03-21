export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai-foundries',
    title: 'The Future of AI Foundries',
    date: '2026-03-01',
    excerpt: 'Exploring how AI specialization will revolutionize the tech industry, mirroring the IC industry evolution.',
    content: `
# The Future of AI Foundries

The AI industry is rapidly evolving towards a more specialized ecosystem. Much like how the Integrated Circuit (IC) industry shifted from integrated manufacturers to specialized design houses and foundries (like TSMC), the AI world is seeing a similar trend.

At **OpenClaw**, I believe that the next decade will be defined by "AI Foundries"—entities that provide the systematic, high-performance infrastructure and expertise to build data-oriented solutions for complex, previously unsolvable problems.

## Key Trends:
1. **Vertical Specialization**: AI models tailored for specific industries (legal, medical, manufacturing).
2. **Data-Centric Infrastructure**: Moving away from model-centric to data-centric development.
3. **The "Enlighten the Future" Mission**: Using AI not just for automation, but for genuine enlightenment of human potential.

Stay tuned as we continue to hack the future.
    `,
    tags: ['AI', 'Future', 'OpenClaw']
  },
  {
    slug: 'kubernetes-production-lessons',
    title: 'Kubernetes in Production: 5 Hard Lessons',
    date: '2026-02-18',
    excerpt: 'After running Kubernetes clusters in production for two years, here are the five lessons that cost me the most time — and how to avoid them.',
    content: `
# Kubernetes in Production: 5 Hard Lessons

Running Kubernetes at scale teaches you things no tutorial ever will. After managing clusters for multiple production workloads, here are the five lessons that hit hardest.

## 1. Resource Requests Are Not Optional

Skipping resource requests and limits feels fine until a single runaway pod starves your entire node. Set them — always. Use VPA in recommendation mode to calibrate real usage first.

## 2. Liveness Probes Can Cause Cascading Failures

A liveness probe that's too aggressive will restart perfectly healthy pods under load, turning a traffic spike into an outage. Prefer readiness probes for traffic gating; use liveness only for true deadlock scenarios.

## 3. etcd Is Your Most Critical Dependency

Most engineers treat etcd as "just the database." It isn't — it's the brain of your cluster. Back it up hourly. Monitor its disk latency obsessively. At > 10ms write latency, strange things start happening to your control plane.

## 4. Namespace Isolation Is Not Security

RBAC and network policies are not optional extras. By default, pods in different namespaces can talk to each other freely. Implement NetworkPolicy deny-all defaults from day one.

## 5. GitOps or You'll Regret It

Manual kubectl applies don't scale. The moment you have more than one engineer touching the cluster, drift becomes inevitable. ArgoCD or Flux, set it up before you need it.

These lessons were expensive. Hopefully reading them isn't.
    `,
    tags: ['Kubernetes', 'DevOps', 'Production']
  },
  {
    slug: 'building-rag-pipelines-2026',
    title: 'Building Production RAG Pipelines in 2026',
    date: '2026-02-05',
    excerpt: 'Retrieval-Augmented Generation has matured. Here\'s what a production-grade RAG pipeline actually looks like today — beyond the demo.',
    content: `
# Building Production RAG Pipelines in 2026

RAG demos are easy. Production RAG is not. After shipping several LLM-powered features to real users, here's what separates a demo from something that actually works.

## The Anatomy of a Good RAG System

A production RAG pipeline has five distinct concerns: ingestion, chunking, retrieval, augmentation, and evaluation. Most tutorials nail the middle three and ignore the outer two.

## Ingestion: Garbage In, Garbage Out

Your retrieval quality ceiling is set at ingestion time. Invest in:
- Document structure preservation (headers, tables, code blocks)
- Metadata enrichment (source, timestamp, author, version)
- Incremental updates with deduplication

## Chunking Strategy Matters More Than Model Choice

Semantic chunking consistently outperforms naive fixed-size splits. Use a sliding window with overlap for dense technical content, and sentence-boundary splits for prose.

## Hybrid Search Is the Current Best Practice

Pure vector search has recall problems for exact-match queries. Combine dense retrieval with BM25 sparse retrieval and use reciprocal rank fusion to merge results. Most teams see 15-25% relevance improvement over vector-only.

## Evaluation Is Not Optional

Without an eval harness, you're flying blind. Build:
1. A golden dataset of 50-100 Q&A pairs from your domain
2. Automated scoring with an LLM-as-judge
3. Regression tests in CI to catch retrieval degradation

Ship eval before you ship features. It's the only way to know if you're improving.
    `,
    tags: ['AI', 'LLM', 'RAG', 'Engineering']
  },
  {
    slug: 'nextjs-server-actions-patterns',
    title: 'Server Actions: The Pattern That Changed How I Build',
    date: '2026-01-22',
    excerpt: 'Next.js Server Actions removed an entire layer of boilerplate from my workflow. Here are the patterns I\'ve settled on after building with them for a year.',
    content: `
# Server Actions: The Pattern That Changed How I Build

When Server Actions landed in Next.js 14, I was skeptical. Another abstraction over fetch? A year and several production apps later, I've changed my mind completely.

## Why They Work

Server Actions collapse the client-server boundary in a way that feels natural for data mutation workflows. You write a function on the server, call it from a client component, and Next.js handles the serialization, revalidation, and error boundary integration.

## The Patterns I Use

### Pattern 1: Zod Validation at the Gate

Every Server Action starts with Zod validation. Not after — at the gate. If validation fails, return early with a typed error. Never trust client-supplied data.

### Pattern 2: Return Typed Results

Instead of throwing errors, return a discriminated union:

- \`{ success: true, data: T }\` on success
- \`{ success: false, error: string }\` on failure

This pattern makes client-side handling predictable and avoids try/catch in components.

### Pattern 3: Revalidate Precisely

Avoid revalidatePath('/') — it's a nuclear option. Revalidate only the specific paths or tags affected by the mutation. Your users will notice the difference in perceived performance.

### Pattern 4: Optimistic Updates with useOptimistic

For list operations, pair Server Actions with useOptimistic to give instant feedback while the server round-trip completes. The UX improvement is dramatic for frequent mutations.

These patterns have halved the boilerplate in my apps without sacrificing type safety or control.
    `,
    tags: ['Next.js', 'TypeScript', 'Architecture']
  }
];
