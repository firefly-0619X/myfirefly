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
    cpp: string
    java: string
    python: string
    docker: string
    github: string
    git: string
    linux: string
    algorithm: string
    dataStructure: string
  }
  blogPurpose: {
    introduction: string
    points: string[]
    conclusion: string
  }
}

export const author: Author = {
  name: 'Firefly',
  title: '在校大学生',
  bio: '热爱技术，分享心得，记录成长历程。',
  avatar: 'https://p5-flow-imagex-sign.byteimg.com/labis/image/dce464c11bc0c16ef85d5d52ea5c838e~tplv-a9rns2rl98-pc_smart_face_crop-v1:512:384.image?lk3s=8e244e95&rcl=202603282102583B5B01284959B040E6B9&rrcfp=cee388b0&x-expires=2090062991&x-signature=mJjjNMMr5eEQG0HChJq3Ku0Q8LM%3D',
  email: '1458533871@qq.com',
  social: {
    github: 'https://github.com/firefly-0619',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com'
  },
  location: '中国',
  education: '计算机科学与技术专业本科生',
  career: '学生',
  growth: '持续学习成长中',
  skills: {
    cpp: '略懂',
    java: '略懂',
    python: '略懂',
    docker: '略懂',
    github: '略懂',
    git: '略懂',
    linux: '略懂',
    algorithm: '略懂',
    dataStructure: '略懂'
  },
  blogPurpose: {
    introduction: '📝 我相信写作是学习和思考的最好方式，通过撰写技术文章，我可以：',
    points: [
      '加深对技术概念的理解',
      '与开发者社区分享经验和见解',
      '记录学习历程，形成知识体系',
    ],
    conclusion: '💡 如果你对我的文章有任何疑问或建议，欢迎通过邮件或社交媒体与我联系。'
  }
}
