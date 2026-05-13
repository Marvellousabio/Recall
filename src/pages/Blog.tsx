import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { prisma } from '@/db/prisma';
import type { BlogPost } from '@/types/types';
import { Calendar, Search } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    });

    setPosts(data);
    setLoading(false);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
              Learning Science Blog
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Insights on cognitive psychology, study techniques, and the science of learning.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full">
                  <CardHeader>
                    <div className="h-48 bg-muted animate-pulse rounded-lg mb-4" />
                    <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {post.cover_image && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">By {post.author}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
