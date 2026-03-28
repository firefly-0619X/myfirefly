import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPosts } from '@/data/posts'

export function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const post = getPosts().find((p) => p.id === id)

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold mb-4 gradient-text">文章不存在</h1>
          <Button asChild>
            <Link to="/posts">返回文章列表</Link>
          </Button>
        </div>
      </div>
    )
  }

  const relatedPosts = getPosts()
    .filter((p: any) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          返回文章列表
        </Link>

        <article className="animate-fade-in">
          <header className="mb-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose-content mb-10">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="font-serif text-2xl font-semibold mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="font-serif text-xl font-semibold mt-10 mb-5">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              } else if (paragraph === '') {
                return <div key={index} className="mb-6"></div>
              } else {
                return (
                  <p key={index} className="mb-6 text-base leading-8 text-foreground/90">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>

          <Card className="mb-10 border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    分享文章
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {relatedPosts.length > 0 && (
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 gradient-text">相关文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover-lift cursor-pointer">
                    <Link to={`/posts/${relatedPost.id}`}>
                      <CardContent className="pt-6">
                        <h3 className="font-serif font-semibold mb-3 line-clamp-2 text-lg">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  )
}
