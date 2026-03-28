import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { PostList } from '@/pages/PostList'
import { PostDetail } from '@/pages/PostDetail'
import { About } from '@/pages/About'
import { Editor } from '@/pages/Editor'
import { ProfileEditor } from '@/pages/ProfileEditor'
import { Login } from '@/pages/Login'
import { useEffect, useState } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser)
          if (user.role === 'admin') {
            setIsAdmin(true)
            return true
          }
        } catch (e) {
          console.error('解析用户信息失败', e)
        }
      }
      return false
    }

    // 立即检查
    if (checkAuth()) {
      setIsLoading(false)
    } else {
      // 监听 storage 事件（同页面内 storage 事件不会触发，需要手动处理）
      const handleStorageChange = () => {
        if (checkAuth()) {
          setIsLoading(false)
        }
      }

      window.addEventListener('storage', handleStorageChange)

      // 短期轮询确保登录状态能及时更新
      const interval = setInterval(() => {
        if (checkAuth()) {
          setIsLoading(false)
          clearInterval(interval)
        }
      }, 50)

      // 1秒后停止轮询
      setTimeout(() => {
        clearInterval(interval)
        setIsLoading(false)
      }, 1000)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        clearInterval(interval)
      }
    }
  }, [location])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  }

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileEditor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
