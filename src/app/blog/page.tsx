import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogData';
import { Calendar, ChevronRight } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Blog & Guides | KagazKit',
  description: 'Learn how to handle digital documents safely, optimize your taxes, and master our web tools through our detailed guides.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <BackToHome />
      
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          KagazKit <span className="text-indigo-600">Guides</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Expert guides on digital privacy, tax optimization, and mastering government document requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-8">
            <div className="flex items-center text-sm text-slate-400 mb-4 font-medium">
              <Calendar className="w-4 h-4 mr-2" /> {post.date}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center text-indigo-600 font-semibold mt-auto">
              Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdSlot format="horizontal" slotId="blog-index-ad-1" className="mb-12" />
    </div>
  );
}
