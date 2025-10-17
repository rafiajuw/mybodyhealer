// src/app/services/blogs/[slug]/page.tsx
import Link from "next/link";
import BlogContent from "./BlogContent";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  reading: string;
  image: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "natural-immunity-boosters",
    title: "Top Natural Immunity Boosters for 2025",
    excerpt:
      "Discover clinically-backed natural supplements and lifestyle tips to strengthen your immune system year-round.",
    date: "2025-07-05",
    reading: "4 min",
    image: "/b5.avif",
  },
  {
    slug: "olive-oil-benefits",
    title: "Cold-Pressed Olive Oil: Benefits & Uses",
    excerpt:
      "Why cold-pressed extra virgin olive oil is a staple for heart health, skin care, and culinary excellence.",
    date: "2025-06-20",
    reading: "3 min",
    image: "/b3.avif",
  },
  {
    slug: "cancer-supportive-nutrition",
    title: "Nutrition Support for Oncology Patients",
    excerpt:
      "A practical guide for caregivers: nutrition, supplements, and safe practices to support cancer care.",
    date: "2025-05-15",
    reading: "6 min",
    image: "/b2.avif",
  },
];

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug) || POSTS[0];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>

          {/* ✅ Fixed: Use Link instead of <a> */}
          <Link
            href="/services/blogs"
            className="text-emerald-600 hover:underline font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return <BlogContent post={post} />;
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}
