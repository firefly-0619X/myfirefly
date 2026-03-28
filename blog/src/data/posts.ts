export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: string
  coverImage?: string
}

export const posts: Post[] = [
  {
    id: '1',
    title: '深入理解 React Hooks',
    excerpt: 'React Hooks 是 React 16.8 引入的新特性，它让你能够在不编写 class 的情况下使用 state 以及其他的 React 特性。',
    content: 'React Hooks 是 React 16.8 引入的新特性，它让你能够在不编写 class 的情况下使用 state 以及其他的 React 特性。\n\n## 基本概念\n\nHooks 是一些可以让你在函数组件里"钩入"React state 及生命周期等特性的函数。\n\n## 常用的 Hooks\n\n### useState\nuseState 是最基本的 Hook，用于在函数组件中添加 state。\n\n### useEffect\nuseEffect 可以让你在函数组件中执行副作用操作。',
    date: '2024-03-15',
    author: '博主',
    category: '前端开发',
    tags: ['React', 'JavaScript', '前端'],
    readTime: '5 分钟'
  },
  {
    id: '2',
    title: 'TypeScript 最佳实践',
    excerpt: 'TypeScript 为 JavaScript 添加了静态类型系统，让代码更加健壮和可维护。本文分享一些 TypeScript 开发的最佳实践。',
    content: 'TypeScript 为 JavaScript 添加了静态类型系统，让代码更加健壮和可维护。本文分享一些 TypeScript 开发的最佳实践。\n\n## 类型定义\n\n### 使用 Interface\nInterface 是定义对象类型的最佳选择，特别是在定义 API 响应或组件 Props 时。\n\n### 类型推断\n充分利用 TypeScript 的类型推断能力，避免过度定义类型。',
    date: '2024-03-12',
    author: '博主',
    category: '前端开发',
    tags: ['TypeScript', 'JavaScript', '编程'],
    readTime: '8 分钟'
  },
  {
    id: '3',
    title: 'Node.js 性能优化指南',
    excerpt: '本文将介绍一些实用的 Node.js 性能优化技巧，帮助你构建更高效的后端服务。',
    content: '本文将介绍一些实用的 Node.js 性能优化技巧，帮助你构建更高效的后端服务。\n\n## 异步处理\n\n### 使用 async/await\n使用 async/await 替代回调函数，让代码更易读。\n\n### 错误处理\n正确的错误处理是性能优化的基础。',
    date: '2024-03-10',
    author: '博主',
    category: '后端开发',
    tags: ['Node.js', '后端', '性能优化'],
    readTime: '10 分钟'
  },
  {
    id: '4',
    title: '现代前端架构设计',
    excerpt: '随着前端应用的复杂度不断增加，良好的架构设计变得至关重要。本文探讨现代前端架构的设计原则和实践。',
    content: '随着前端应用的复杂度不断增加，良好的架构设计变得至关重要。本文探讨现代前端架构的设计原则和实践。\n\n## 组件化设计\n\n### 单一职责\n每个组件应该只负责一个功能。\n\n### 可复用性\n设计可复用的组件，提高开发效率。',
    date: '2024-03-08',
    author: '博主',
    category: '架构设计',
    tags: ['前端', '架构', '设计模式'],
    readTime: '12 分钟'
  },
  {
    id: '5',
    title: 'Docker 容器化部署实践',
    excerpt: 'Docker 是容器化技术的领导者，本文分享使用 Docker 进行应用部署的实践经验。',
    content: 'Docker 是容器化技术的领导者，本文分享使用 Docker 进行应用部署的实践经验。\n\n## Docker 基础\n\n### 镜像构建\n编写高效的 Dockerfile 是容器化的第一步。\n\n### 多阶段构建\n使用多阶段构建减小镜像体积。',
    date: '2024-03-05',
    author: '博主',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', '部署'],
    readTime: '15 分钟'
  },
  {
    id: '6',
    title: 'GraphQL 入门指南',
    excerpt: 'GraphQL 是一种用于 API 的查询语言，相比 REST API 具有更灵活的数据获取能力。',
    content: 'GraphQL 是一种用于 API 的查询语言，相比 REST API 具有更灵活的数据获取能力。\n\n## 核心概念\n\n### Schema\nSchema 定义了 API 的类型系统。\n\n### Query 和 Mutation\nQuery 用于查询数据，Mutation 用于修改数据。',
    date: '2024-03-02',
    author: '博主',
    category: 'API设计',
    tags: ['GraphQL', 'API', '后端'],
    readTime: '7 分钟'
  }
]

export const categories = [
  '全部',
  '前端开发',
  '后端开发',
  '架构设计',
  'DevOps',
  'API设计'
]
