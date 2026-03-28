import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TestStorage() {
  const [userPosts, setUserPosts] = useState<any[]>([])

  const checkStorage = () => {
    const stored = localStorage.getItem('blog_user_posts')
    console.log('Raw localStorage data:', stored)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        console.log('Parsed user posts:', parsed)
        setUserPosts(parsed)
      } catch (e) {
        console.error('Failed to parse:', e)
      }
    } else {
      console.log('No data found in localStorage')
      setUserPosts([])
    }
  }

  const clearStorage = () => {
    localStorage.removeItem('blog_user_posts')
    setUserPosts([])
    console.log('Cleared localStorage')
  }

  const testSave = () => {
    const testPost = {
      id: 'test-' + Date.now(),
      title: '测试文章',
      excerpt: '这是测试文章摘要',
      content: '这是测试文章内容',
      date: new Date().toISOString().split('T')[0],
      author: '博主',
      category: '测试',
      tags: ['测试'],
      readTime: '1 分钟'
    }
    const existing = localStorage.getItem('blog_user_posts')
    const posts = existing ? JSON.parse(existing) : []
    posts.push(testPost)
    localStorage.setItem('blog_user_posts', JSON.stringify(posts))
    console.log('Saved test post:', testPost)
    checkStorage()
  }

  useEffect(() => {
    checkStorage()
    const interval = setInterval(checkStorage, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">LocalStorage 测试页面</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={checkStorage}>检查 localStorage</Button>
              <Button onClick={testSave}>保存测试文章</Button>
              <Button onClick={clearStorage} variant="outline">清空 localStorage</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              打开浏览器控制台查看详细日志
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户创建的文章 ({userPosts.length} 篇)</CardTitle>
          </CardHeader>
          <CardContent>
            {userPosts.length === 0 ? (
              <p className="text-muted-foreground">没有找到用户创建的文章</p>
            ) : (
              <ul className="space-y-2">
                {userPosts.map((post, index) => (
                  <li key={post.id || index} className="p-4 border rounded">
                    <div className="font-semibold">{post.title}</div>
                    <div className="text-sm text-muted-foreground">ID: {post.id}</div>
                    <div className="text-sm text-muted-foreground">日期: {post.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
