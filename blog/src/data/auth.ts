export interface User {
  username: string
  password: string
  role: 'admin' | 'user'
  name: string
}

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: '管理员'
  },
  {
    username: 'user',
    password: 'user123',
    role: 'user',
    name: '普通用户'
  }
]

export const login = (username: string, password: string): User | null => {
  const user = users.find(u => u.username === username && u.password === password)
  return user || null
}

export const logout = () => {
  localStorage.removeItem('currentUser')
}
