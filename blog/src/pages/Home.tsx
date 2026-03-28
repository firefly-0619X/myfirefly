import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, BookOpen, Heart, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { posts } from '@/data/posts'
import { PostCard } from '@/components/PostCard'

export function Home() {
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen pt-16">
      <section className="relative overflow-hidden gradient-bg text-white py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              ✨ 欢迎来到我的技术博客
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              探索代码的<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                无限可能
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              分享技术心得，记录成长历程。在这里，你可以找到关于前端、后端、架构设计等方面的技术文章和实战经验。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-white/60 bg-white/20 text-white hover:bg-white/30 hover:-translate-y-1 transition-all duration-200">
                <Link to="/posts">浏览文章</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/60 bg-white/20 text-white hover:bg-white/30 hover:-translate-y-1 transition-all duration-200">
                <Link to="/about">了解更多</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-slide-up">
            <Card className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/30 backdrop-blur-sm group cursor-pointer hover-lift hover:border-blue-400/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3">原创文章</h3>
                <p className="text-sm text-white/90">高质量技术文章，深入浅出</p>
                <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>100+ 篇原创</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>持续更新</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                    <span>深度解析</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-white/30 backdrop-blur-sm group cursor-pointer hover-lift hover:border-orange-400/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3">实战经验</h3>
                <p className="text-sm text-white/90">真实项目经验分享</p>
                <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span>项目实战</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span>最佳实践</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>踩坑记录</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/30 to-teal-500/30 border border-white/30 backdrop-blur-sm group cursor-pointer hover-lift hover:border-green-400/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/40">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3">持续更新</h3>
                <p className="text-sm text-white/90">定期发布新内容</p>
                <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span>周更频率</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>优质内容</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>技术前沿</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">精选内容</Badge>
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold gradient-text">精选文章</h2>
          </div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            精选优质技术文章，帮助你快速提升技术水平
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">最新发布</Badge>
            <h2 className="text-4xl font-bold gradient-text">最新文章</h2>
            <p className="text-muted-foreground mt-4">
              持续更新，为你带来最新的技术动态和实战经验
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="gradient-bg text-white border-0 hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">📬 订阅我的博客</CardTitle>
            <CardDescription className="text-white/80">
              获取最新的技术文章和教程，不错过任何更新
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="请输入您的邮箱"
                className="flex-1 h-12 px-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <Button
                type="submit"
                className="h-12 px-8 bg-white text-primary hover:bg-white/90 font-semibold"
              >
                立即订阅
              </Button>
            </form>
            <p className="text-sm text-white/60 mt-4">
              无垃圾邮件，随时可以取消订阅
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
