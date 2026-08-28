import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blogData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Wrench } from 'lucide-react';
import AdSlot from '@/components/AdSlot';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | KagazKit Guides`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full max-w-4xl mx-auto px-4 pb-20">
      <div className="mb-10">
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
        
        <div className="flex items-center text-sm text-indigo-600 mb-4 font-semibold uppercase tracking-wider">
          <Calendar className="w-4 h-4 mr-2" /> {post.date}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>
      </div>

      {post.relatedToolId && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Wrench className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Try the Tool</h3>
              <p className="text-sm text-slate-600">Apply what you learn in this guide instantly.</p>
            </div>
          </div>
          <Link 
            href={`/tools/${post.relatedToolId}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
          >
            Open Tool
          </Link>
        </div>
      )}

      <AdSlot format="horizontal" slotId={`blog-post-${post.slug}-1`} className="mb-12" />

      {/* Main Content */}
      <div 
        className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-img:rounded-2xl prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <AdSlot format="horizontal" slotId={`blog-post-${post.slug}-2`} className="mt-16" />
    </article>
  );
}
