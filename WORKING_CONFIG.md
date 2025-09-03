# Label Studio 开发环境配置记录

## 当前工作配置 (2025-08-29)

### 环境信息
- Node.js: v18.20.8 (npm v10.8.2)
- Python: 3.12.9
- 项目路径: `/Users/wangfeng/Desktop/projects/label-studio-develop`

### 服务器配置

#### 后端 Django 服务器
- 端口: 8080
- 地址: http://127.0.0.1:8080
- 启动命令: `poetry run python label_studio/manage.py runserver 127.0.0.1:8080`
- 工作目录: `/Users/wangfeng/Desktop/projects/label-studio-develop`

#### 前端开发服务器
- 端口: 8010
- 地址: http://localhost:8010
- 启动命令: `DJANGO_HOSTNAME=http://127.0.0.1:8080 nvm use 18 && npm run ls:dev`
- 工作目录: `/Users/wangfeng/Desktop/projects/label-studio-develop/web`

### Webpack 配置 (web/webpack.config.js)

#### DevServer 配置
```javascript
devServer: {
  // Port for the Webpack dev server
  port: HMR_PORT, // 8010
  // Enable HMR
  hot: true,
  // Allow cross-origin requests from Django
  headers: { "Access-Control-Allow-Origin": "*" },
  // Serve static files from Django
  static: {
    directory: path.resolve(__dirname, "../label_studio/core/static"),
    publicPath: "/static/",
  },
  devMiddleware: {
    publicPath: `${FRONTEND_HOSTNAME}/react-app/`,
  },
  allowedHosts: "all", // Allow access from Django's server
  proxy: [
    {
      context: ["/api"],
      target: `${DJANGO_HOSTNAME}`.replace('localhost', '127.0.0.1'),
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    },
    {
      context: (pathname) => {
        // Only proxy non-API, non-react-app requests to Django
        return !pathname.startsWith("/api") && !pathname.startsWith("/react-app");
      },
      target: `${DJANGO_HOSTNAME}`.replace('localhost', '127.0.0.1'),
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    },
  ],
}
```

### 关键配置要点

1. **静态文件处理**:
   - Webpack devServer 的 `static` 配置指向 Django 的静态文件目录
   - 路径: `../label_studio/core/static`
   - 公共路径: `/static/`

2. **代理配置**:
   - `/api` 路径代理到 Django 后端
   - 其他非 `/api` 和非 `/react-app` 的请求也代理到 Django
   - 目标地址: http://127.0.0.1:8080

3. **环境变量**:
   - `DJANGO_HOSTNAME=http://127.0.0.1:8080`
   - Node.js 版本通过 nvm 切换到 18

### 验证状态

✅ 后端服务器正常运行在 8080 端口  
✅ 前端服务器正常运行在 8010 端口  
✅ 静态文件可以正常访问 (包括带哈希的文件)  
✅ API 代理工作正常  
✅ 页面可以正常加载和渲染  

### 测试验证

- 带哈希的 jQuery 文件: `http://localhost:8010/static/js/jquery.min.e6c2415c0ace.js` ✅
- 不带哈希的 jQuery 文件: `http://localhost:8010/static/js/jquery.min.js` ✅
- 主页面: `http://localhost:8010` ✅

### 注意事项

- 必须使用 Node.js v18
- 必须设置 `DJANGO_HOSTNAME` 环境变量
- Webpack 的 `static` 配置是关键，不能移除
- 代理配置的顺序很重要，`/api` 要在通用规则之前

---

**记录时间**: 2025-08-29  
**状态**: 正常工作  
**最后验证**: 所有功能正常