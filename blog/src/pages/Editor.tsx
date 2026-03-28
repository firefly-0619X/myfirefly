import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, X, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { addUserPost, updateUserPost, deleteUserPost, getPosts } from '@/data/posts'
import type { Post } from '@/data/posts'

export function Editor() {
  const navigate = useNavigate()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [newTag, setNewTag] = useState('')
  const [posts, setPosts] = useState<Post[]>(getPosts())

  // 监听 localStorage 变化
  useEffect(() => {
    const handleStorageChange = () => {
      setPosts(getPosts())
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleCreatePost = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: '新文章',
      excerpt: '文章摘要',
      content: '文章内容',
      date: new Date().toISOString().split('T')[0],
      author: '博主',
      category: '前端开发',
      tags: [],
      readTime: '5 分钟'
    }
    setEditingPost(newPost)
    setIsCreateModalOpen(false)
  }

  const handleSavePost = () => {
    if (!editingPost) return
    // 检查是否是新建的文章
    if (!editingPost.id || editingPost.id === String(Date.now())) {
      addUserPost(editingPost)
    } else {
      updateUserPost(editingPost)
    }
    // 刷新文章列表
    setPosts(getPosts())
    // 使用 setTimeout 让 UI 先更新
    setTimeout(() => {
      alert('文章已保存！')
    }, 0)
    setEditingPost(null)
  }

  const handleDeletePost = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      deleteUserPost(id)
      // 刷新文章列表
      setPosts(getPosts())
      alert('文章已删除！')
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
  }

  const handleAddTag = () => {
    if (!editingPost || !newTag.trim()) return
    setEditingPost({
      ...editingPost,
      tags: [...editingPost.tags, newTag.trim()]
    })
    setNewTag('')
  }

  const handleRemoveTag = (tag: string) => {
    if (!editingPost) return
    setEditingPost({
      ...editingPost,
      tags: editingPost.tags.filter((t) => t !== tag)
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2 gradient-text">文章管理</h1>
            <p className="text-muted-foreground text-base">创建、编辑和管理你的博客文章</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} size="lg" className="gradient-bg gap-2">
            <Plus className="w-4 h-4" />
            新建文章
          </Button>
        </div>

        {editingPost ? (
          <Card className="animate-fade-in border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif text-xl">编辑文章</CardTitle>
                  <CardDescription className="text-sm">编辑文章内容和元数据</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPost(null)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  取消
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">文章标题</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="输入文章标题"
                  className="text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">文章摘要</label>
                <Textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="输入文章摘要"
                  rows={3}
                  className="text-base leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">文章内容</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="输入文章内容，支持 Markdown 格式"
                  rows={12}
                  className="font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">分类</label>
                  <Input
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    placeholder="文章分类"
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">阅读时间</label>
                  <Input
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    placeholder="如：5 分钟"
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">封面图片URL</label>
                  <Input
                    value={editingPost.coverImage || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                    placeholder="可选，留空则无封面"
                    className="text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">标签</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editingPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-sm">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="添加新标签"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="text-base"
                  />
                  <Button onClick={handleAddTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSavePost} size="lg" className="gradient-bg gap-2">
                  <Save className="w-4 h-4" />
                  保存文章
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setEditingPost(null)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">📖 {post.readTime}</span>
                        <span className="flex items-center gap-1">👤 {post.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                        className="gap-2"
                      >
                        编辑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
          <Card>
            <CardHeader>
              <CardTitle>新建文章</CardTitle>
              <CardDescription>创建一篇新的博客文章</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                点击下方按钮创建一篇新文章，创建后可以进行详细编辑。
              </p>
              <Button onClick={handleCreatePost} className="w-full gradient-bg">
                <Plus className="w-4 h-4 mr-2" />
                创建文章
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-full"
              >
                取消
              </Button>
            </CardContent>
          </Card>
        </Dialog>
      </div>
    </div>
  )
}
