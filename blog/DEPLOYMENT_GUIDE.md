# 博客部署访问指南

## 当前状态

您的博客已经成功构建并运行在服务器上！

### 本地测试（在服务器内）
- `http://localhost:8080` - Vite Preview 服务器
- `http://localhost:8081` - Python HTTP 服务器
- `http://localhost:5173` - 开发服务器

### 内网访问
- `http://172.17.0.26:8080` - 内网IP访问

## 如何让朋友访问您的博客

### 方法1：开放云服务器端口（最快）

**步骤：**
1. 登录您的云服务商控制台
2. 找到您的服务器实例（公网IP: 43.139.160.244）
3. 进入"安全组"或"防火墙"设置
4. 添加入站规则：
   - 协议：TCP
   - 端口：8080
   - 来源：0.0.0.0/0（允许所有IP访问）
5. 保存配置

**访问地址：** `http://43.139.160.244:8080`

### 方法2：使用 GitHub Pages（推荐，免费）

**步骤：**
1. 在您的 GitHub 仓库中创建 `gh-pages` 分支
2. 将构建好的 `dist` 目录推送到该分支
3. 在仓库设置中启用 GitHub Pages

```bash
# 在服务器上执行
cd /workspace/blog
git checkout -b gh-pages
git add -f dist/
git commit -m "Add built files"
git push origin gh-pages
```

**访问地址：** `https://firefly-0619.github.io/cloud-vit/`

### 方法3：使用 Netlify（免费，简单）

1. 访问 [Netlify](https://netlify.com)
2. 创建账号并登录
3. 拖拽 `dist` 文件夹到 Netlify 部署区域
4. 获得公网URL

### 方法4：使用 Vercel（免费，专业）

1. 访问 [Vercel](https://vercel.com)
2. 安装 Vercel CLI：`npm i -g vercel`
3. 在项目目录运行：`vercel deploy --prod`

## 故障排除

### 如果端口开放后仍无法访问：

1. **检查防火墙规则**：确保服务器内部防火墙也允许8080端口
   ```bash
   # 检查防火墙状态
   sudo ufw status
   # 开放8080端口
   sudo ufw allow 8080
   ```

2. **测试连接**：
   ```bash
   # 在服务器上测试
   curl http://localhost:8080
   # 测试端口监听
   netstat -tulpn | grep 8080
   ```

3. **检查安全组**：确认云服务商安全组规则已生效

## 推荐方案

**对于学习博客，我推荐使用 GitHub Pages：**
- 完全免费
- 自动HTTPS
- 全球CDN加速
- 支持自定义域名
- 部署简单

需要我帮您配置 GitHub Pages 部署吗？