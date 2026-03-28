import { useState } from 'react'
import { Search } from 'lucide-react'
import { categories, posts } from '@/data/posts'
import { PostCard } from '@/components/PostCard'

export function PostList() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-4 gradient-text">所有文章</h1>
          <p className="text-muted-foreground text-base">
            共找到 {filteredPosts.length} 篇文章
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-base"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'gradient-bg text-white shadow-md'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">没有找到匹配的文章</p>
            <p className="text-muted-foreground text-sm mt-2">尝试搜索其他关键词或选择不同分类</p>
          </div>
        )}
      </div>
    </div>
  )
}
