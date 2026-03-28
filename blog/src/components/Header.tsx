import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Edit, User, LogOut } from 'lucide-react'

const navItems = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/posts' },
  { name: '关于', path: '/about' },
  { name: '管理', path: '/editor', admin: true },
  { name: '个人信息', path: '/profile', profile: true }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 检查系统主题偏好或 localStorage
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }

    // 获取当前用户
    const checkUser = () => {
      const userStr = localStorage.getItem('currentUser')
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr))
        } catch (e) {
          setCurrentUser(null)
        }
      } else {
        setCurrentUser(null)
      }
    }

    checkUser()

    // 监听自定义事件
    const handleAuthChange = () => {
      checkUser()
    }

    window.addEventListener('auth-change', handleAuthChange)
    window.addEventListener('storage', handleAuthChange)

    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
      window.removeEventListener('storage', handleAuthChange)
    }
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    const newIsDark = !isDark
    setIsDark(newIsDark)

    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease'

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    setTimeout(() => {
      document.documentElement.style.transition = ''
      setIsAnimating(false)
    }, 300)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    // 触发自定义事件
    window.dispatchEvent(new Event('auth-change'))
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-xl font-bold gradient-text">Blog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {currentUser?.role === 'admin' && (
              <Link
                to="/editor"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  location.pathname === '/editor'
                    ? 'gradient-bg text-white'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <Edit className="w-4 h-4" />
                管理
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  location.pathname === '/profile'
                    ? 'gradient-bg text-white'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <User className="w-4 h-4" />
                个人信息
              </Link>
            )}
            <div className="ml-4 flex items-center space-x-2 border-l border-border pl-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {currentUser.name} ({currentUser.role === 'admin' ? '管理员' : '用户'})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    登出
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  登录
                </button>
              )}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg hover:bg-muted transition-all duration-300 ${
                  isAnimating ? 'scale-110' : 'scale-100'
                }`}
                aria-label="切换主题"
              >
                {isDark ? <Sun className={`w-5 h-5 transition-all duration-300 ${isAnimating ? 'rotate-180' : ''}`} /> : <Moon className={`w-5 h-5 transition-all duration-300 ${isAnimating ? 'rotate-180' : ''}`} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-muted transition-all duration-300 ${
                isAnimating ? 'scale-110' : 'scale-100'
              }`}
            >
              {isDark ? <Sun className={`w-5 h-5 transition-all duration-300 ${isAnimating ? 'rotate-180' : ''}`} /> : <Moon className={`w-5 h-5 transition-all duration-300 ${isAnimating ? 'rotate-180' : ''}`} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {currentUser?.role === 'admin' && (
                <Link
                  to="/editor"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === '/editor'
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Edit className="w-4 h-4 mr-2 inline" />
                  管理
                </Link>
              )}
              {currentUser?.role === 'admin' && (
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === '/profile'
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <User className="w-4 h-4 mr-2 inline" />
                  个人信息
                </Link>
              )}
              {!currentUser ? (
                <button
                  onClick={() => {
                    handleLogin()
                    setIsMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-left"
                >
                  登录
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-muted-foreground hover:bg-muted transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 mr-2 inline" />
                  登出
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
