# Label Studio 开发环境配置指南

本文档记录了Label Studio项目的完整开发环境配置和启动步骤，包括前后端服务的正确配置。

## 环境要求

- Python 3.12+
- Node.js 18.20.8
- Poetry (Python包管理)
- Yarn (Node.js包管理)

## 项目结构

```
label-studio-develop/
├── label_studio/          # 后端Django应用
├── web/                   # 前端React应用
├── .env                   # 环境变量配置
└── pyproject.toml         # Python依赖配置
```

## 初始化配置

### 1. 安装依赖

```bash
# 安装Python依赖
poetry install

# 安装Node.js依赖
cd web
yarn install
```

### 2. 数据库初始化

```bash
# 数据库迁移
poetry run python label_studio/manage.py migrate

# 创建超级用户
poetry run python label_studio/manage.py createsuperuser
```

### 3. 创建测试用户和组织

如果使用测试用户 `test@example.com`，需要确保用户有正确的组织成员身份：

```bash
poetry run python label_studio/manage.py shell -c "
from users.models import User
from organizations.models import Organization, OrganizationMember

# 获取或创建用户
user, created = User.objects.get_or_create(
    email='test@example.com',
    defaults={'username': 'test', 'first_name': 'Test', 'last_name': 'User'}
)
if created:
    user.set_password('password123')
    user.save()

# 创建组织
org, created = Organization.objects.get_or_create(
    title='Default Organization',
    defaults={'created_by': user}
)

# 创建组织成员身份
membership, created = OrganizationMember.objects.get_or_create(
    user=user, 
    organization=org
)

print(f'用户: {user.email}')
print(f'组织: {org.title}')
print(f'成员身份创建: {created}')
"
```

## 启动服务

### 1. 启动后端服务

```bash
# 在项目根目录
poetry run python label_studio/manage.py runserver
```

后端服务将在 `http://localhost:8080` 启动

### 2. 启动前端服务

```bash
# 在web目录
cd web

# 使用Node.js 18
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 18

# 启动前端开发服务器（使用自定义端口避免冲突）
FRONTEND_HOSTNAME=http://localhost:3002 npm run ls:dev
```

前端服务将在 `http://localhost:3002` 启动

## 访问应用

1. 打开浏览器访问：`http://localhost:8080`
2. 使用创建的用户账号登录
3. 如果使用测试账号：
   - 邮箱：`test@example.com`
   - 密码：`password123`

## 国际化功能

项目已配置了中英文国际化支持：

- 语言切换按钮位于页头右侧
- 支持中文（zh）和英文（en）
- 翻译文件位于：`web/apps/labelstudio/src/locales/`

## 常见问题

### 1. 端口冲突

如果遇到端口8010被占用的错误，使用环境变量指定不同端口：

```bash
FRONTEND_HOSTNAME=http://localhost:3002 npm run ls:dev
```

### 2. 登录后显示错误

确保用户有正确的组织成员身份，参考上面的"创建测试用户和组织"部分。

### 3. 前端服务启动缓慢

前端服务首次启动可能需要较长时间进行编译，请耐心等待。

## 开发工具

- 后端API文档：`http://localhost:8080/api/`
- Django管理界面：`http://localhost:8080/admin/`

## 环境变量

主要环境变量配置（`.env`文件）：

```bash
DJANGO_HOSTNAME=http://localhost:8080
FRONTEND_HOSTNAME=http://localhost:3002
FRONTEND_HMR=true
```

---

**注意**：首次启动时，请确保按照上述步骤完成所有初始化配置，特别是数据库迁移和用户组织设置。