import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, User as UserIcon, ArrowLeft, LogIn } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/data/auth'
import type { User } from '@/data/auth'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const user = login(formData.username, formData.password)
    if (user && user.role === 'admin') {
      // 保存到 localStorage
      localStorage.setItem('currentUser', JSON.stringify(user))
      // 触发自定义事件通知其他组件更新状态
      window.dispatchEvent(new Event('auth-change'))
      window.dispatchEvent(new Event('storage'))
      // 立即跳转，不需要等待
      navigate(from, { replace: true })
    } else if (user && user.role !== 'admin') {
      setError('此账号无管理员权限')
    } else {
      setError('用户名或密码错误')
    }
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10">
      <div className="w-full max-w-md px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Button>

        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-serif text-2xl">欢迎登录</CardTitle>
            <CardDescription>
              请输入您的账号和密码
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">用户名</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="请输入用户名"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="请输入密码"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
