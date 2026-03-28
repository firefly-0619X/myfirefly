import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { author, Author } from '@/data/author'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function About() {
  const [currentAuthor, setCurrentAuthor] = useState<Author>(author)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取个人信息
    const savedAuthor = localStorage.getItem('author')
    if (savedAuthor) {
      setCurrentAuthor(JSON.parse(savedAuthor))
    }

    // 检查是否为管理员
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setIsAdmin(user.role === 'admin')
    }
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-center gradient-text flex-1">关于我</h1>
          {isAdmin && (
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link to="/profile">
                <Settings className="w-4 h-4" />
                编辑
              </Link>
            </Button>
          )}
        </div>

        <Card className="mb-8 hover-lift border-2">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-36 h-36 rounded-full gradient-bg p-1">
                  <img
                    src={currentAuthor.avatar}
                    alt={currentAuthor.name}
                    className="w-full h-full rounded-full bg-white"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-3xl font-bold mb-2">{currentAuthor.name}</h2>
                <p className="text-primary font-semibold mb-4">{currentAuthor.title}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">{currentAuthor.bio}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a href={currentAuthor.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a href={currentAuthor.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a href={currentAuthor.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a href={`mailto:${currentAuthor.email}`}>
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5 text-primary" />
                个人信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>{currentAuthor.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <span>{currentAuthor.education}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <span>{currentAuthor.career}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌱</span>
                  <span>{currentAuthor.growth}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2 text-xl">
                <Calendar className="w-5 h-5 text-primary" />
                技术栈
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-base">编程语言</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    C++: {currentAuthor.skills.cpp} | Java: {currentAuthor.skills.java} | Python: {currentAuthor.skills.python}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-base">开发工具</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Docker: {currentAuthor.skills.docker} | Git: {currentAuthor.skills.git} | Linux: {currentAuthor.skills.linux}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-base">算法基础</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    算法: {currentAuthor.skills.algorithm} | 数据结构: {currentAuthor.skills.dataStructure}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">博客宗旨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                {currentAuthor.blogPurpose.introduction}
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 leading-relaxed">
                {currentAuthor.blogPurpose.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed text-base">
                {currentAuthor.blogPurpose.conclusion}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
