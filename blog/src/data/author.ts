export interface Author {
  name: string
  title: string
  bio: string
  avatar: string
  email: string
  social: {
    github: string
    twitter: string
    linkedin: string
  }
  location: string
  education: string
  career: string
  growth: string
  skills: {
    frontend: string
    backend: string
    devops: string
  }
  blogPurpose: {
    introduction: string
    points: string[]
    conclusion: string
  }
}

export const author: Author = {
  name: '张三',
  title: '全栈开发工程师',
  bio: '热爱技术，专注于 Web 开发和云原生技术。分享技术心得，记录成长历程。',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  email: 'author@example.com',
  social: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com'
  },
  location: '中国',
  education: '计算机科学专业',
  career: '全栈开发工程师',
  growth: '持续学习成长中',
  skills: {
    frontend: 'React, TypeScript, Vue.js, Tailwind CSS',
    backend: 'Node.js, Python, Go, PostgreSQL',
    devops: 'Docker, Kubernetes, AWS, CI/CD'
  },
  blogPurpose: {
    introduction: '📝 我相信写作是学习和思考的最好方式，通过撰写技术文章，我可以：',
    points: [
      '加深对技术概念的理解',
      '与开发者社区分享经验和见解',
      '记录学习历程，形成知识体系',
      '帮助他人解决技术问题'
    ],
    conclusion: '💡 如果你对我的文章有任何疑问或建议，欢迎通过邮件或社交媒体与我联系。'
  }
}
