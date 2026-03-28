import { useState, useEffect } from 'react'
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { author, Author } from '@/data/author'
import { useNavigate } from 'react-router-dom'

export function ProfileEditor() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Author>(author)

  useEffect(() => {
    // 从 localStorage 读取个人信息
    const savedAuthor = localStorage.getItem('author')
    if (savedAuthor) {
      try {
        const parsed = JSON.parse(savedAuthor)
        // 合并旧数据和新数据结构
        setFormData(prev => ({
          ...prev,
          ...parsed,
          // 确保 skills 字段存在
          skills: parsed.skills || prev.skills,
          // 确保其他新增字段存在
          location: parsed.location || prev.location,
          education: parsed.education || prev.education,
          career: parsed.career || prev.career,
          growth: parsed.growth || prev.growth,
          blogPurpose: parsed.blogPurpose || prev.blogPurpose
        }))
      } catch (e) {
        console.error('解析个人信息失败', e)
      }
    }
  }, [])

  const handleInputChange = (field: string, value: string, subField?: string) => {
    setFormData(prev => {
      if (subField) {
        const fieldValue = prev[field as keyof Author]
        if (typeof fieldValue === 'object' && fieldValue !== null) {
          return {
            ...prev,
            [field]: {
              ...fieldValue,
              [subField]: value
            }
          }
        }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleSave = () => {
    // 保存到 localStorage
    localStorage.setItem('author', JSON.stringify(formData))
    // 重新加载页面以应用更改
    window.location.reload()
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold gradient-text">编辑个人信息</h1>
          <Button variant="outline" onClick={handleCancel} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-xl">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">姓名</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="请输入姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">职位</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="请输入职位"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">个人简介</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="请输入个人简介"
                className="w-full h-32 px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">头像 URL</label>
              <Input
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                placeholder="请输入头像图片 URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">邮箱</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="请输入邮箱"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-xl">社交媒体</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">GitHub</label>
              <Input
                value={formData.social.github}
                onChange={(e) => handleInputChange('social', e.target.value, 'github')}
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <Input
                value={formData.social.twitter}
                onChange={(e) => handleInputChange('social', e.target.value, 'twitter')}
                placeholder="https://twitter.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <Input
                value={formData.social.linkedin}
                onChange={(e) => handleInputChange('social', e.target.value, 'linkedin')}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-xl">详细信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">所在地</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="请输入所在地"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">教育背景</label>
              <Input
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="请输入教育背景"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">职业</label>
              <Input
                value={formData.career}
                onChange={(e) => handleInputChange('career', e.target.value)}
                placeholder="请输入职业"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">成长状态</label>
              <Input
                value={formData.growth}
                onChange={(e) => handleInputChange('growth', e.target.value)}
                placeholder="请输入成长状态"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-xl">技术栈</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">C++</label>
              <Input
                value={formData.skills.cpp}
                onChange={(e) => handleInputChange('skills', e.target.value, 'cpp')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Java</label>
              <Input
                value={formData.skills.java}
                onChange={(e) => handleInputChange('skills', e.target.value, 'java')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Python</label>
              <Input
                value={formData.skills.python}
                onChange={(e) => handleInputChange('skills', e.target.value, 'python')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Docker</label>
              <Input
                value={formData.skills.docker}
                onChange={(e) => handleInputChange('skills', e.target.value, 'docker')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub</label>
              <Input
                value={formData.skills.github}
                onChange={(e) => handleInputChange('skills', e.target.value, 'github')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Git</label>
              <Input
                value={formData.skills.git}
                onChange={(e) => handleInputChange('skills', e.target.value, 'git')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Linux</label>
              <Input
                value={formData.skills.linux}
                onChange={(e) => handleInputChange('skills', e.target.value, 'linux')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">算法</label>
              <Input
                value={formData.skills.algorithm}
                onChange={(e) => handleInputChange('skills', e.target.value, 'algorithm')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">数据结构</label>
              <Input
                value={formData.skills.dataStructure}
                onChange={(e) => handleInputChange('skills', e.target.value, 'dataStructure')}
                placeholder="例如: 熟悉/略懂/了解"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-xl">博客宗旨</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">引言</label>
              <textarea
                value={formData.blogPurpose.introduction}
                onChange={(e) => handleInputChange('blogPurpose', e.target.value, 'introduction')}
                placeholder="请输入引言"
                className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">要点列表（每行一个）</label>
              {formData.blogPurpose.points.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...formData.blogPurpose.points]
                      newPoints[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        blogPurpose: {
                          ...prev.blogPurpose,
                          points: newPoints
                        }
                      }))
                    }}
                    placeholder={`要点 ${index + 1}`}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newPoints = formData.blogPurpose.points.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        blogPurpose: {
                          ...prev.blogPurpose,
                          points: newPoints
                        }
                      }))
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    blogPurpose: {
                      ...prev.blogPurpose,
                      points: [...prev.blogPurpose.points, '']
                    }
                  }))
                }}
                className="gap-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                添加要点
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">结语</label>
              <textarea
                value={formData.blogPurpose.conclusion}
                onChange={(e) => handleInputChange('blogPurpose', e.target.value, 'conclusion')}
                placeholder="请输入结语"
                className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            保存更改
          </Button>
        </div>
      </div>
    </div>
  )
}
