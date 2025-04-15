# Movie Ticket 🎬

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.0.0-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg?logo=vite)
![Ant Design Mobile](https://img.shields.io/badge/Ant%20Design%20Mobile-5.39.0-1677FF.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 项目预览图
![image](https://github.com/user-attachments/assets/2577197f-49ec-424d-a815-173590ad6278)
## 原型参考 

![image](https://github.com/user-attachments/assets/d775c428-1e4b-4844-b43c-0598b6dd8364)





## 📱 项目简介

Movie Ticket 是一个基于 React + Nest 开发的全栈移动端票务应用，专注于电影、演唱会等票务预订和支付管理。本项目采用现代化的前端技术栈，提供了流畅的用户体验和完整的票务购买流程。
此项目为了学习巩固React技术栈。

## ✨ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite 6
- **UI组件库**: Ant Design Mobile 5.39.0
- **路由管理**: React Router DOM 7
- **HTTP客户端**: Axios
- **图标**: React Icons, Ant Design Mobile Icons

## 🚀 项目结构

```
react-movie/
├── public/               # 静态资源
├── src/
│   ├── components/       # 可复用组件
│   │   ├── ApplyInfo/    # 支付确认组件
│   │   ├── BottomBar/    # 底部导航栏
│   │   ├── CardItem/     # 活动卡片组件
│   │   ├── MainLayout/   # 主布局组件
│   │   └── PrivateRoute/ # 权限路由组件
│   ├── context/          # 上下文管理
│   │   └── AuthContextWrapper.jsx  # 认证上下文
│   ├── pages/            # 页面组件
│   │   ├── Concert/      # 演唱会页面
│   │   ├── DetailInfo/   # 详情页面
│   │   ├── Index/        # 首页
│   │   ├── Login/        # 登录页面
│   │   ├── Movie/        # 电影页面
│   │   ├── Order/        # 订单页面
│   │   ├── Payment/      # 支付页面
│   │   ├── Person/       # 个人中心
│   │   ├── ResultPage/   # 支付结果页
│   │   └── Search/       # 搜索页面
│   ├── routes/           # 路由配置
│   ├── services/         # API服务
│   │   └── api/          # API模块
│   ├── App.jsx           # 根组件
│   └── main.jsx          # 入口文件
├── package.json          # 依赖管理
└── vite.config.js        # Vite配置
```

## 🔍 核心功能

### 用户认证与授权

- **登录与注册**: 支持用户注册和登录
- **权限控制**: 使用 Context API 管理认证状态
- **私有路由保护**: PrivateRoute 组件确保特定页面需要登录

### 首页与展示

- **分类浏览**: 支持电影、演唱会等不同类型活动浏览
- **轮播展示**: 首页轮播图展示热门活动
- **搜索功能**: 支持关键词搜索活动

### 详情与下单

- **活动详情**: 展示活动的详细信息
- **场次选择**: 选择具体的场次和日期
- **座位选择**: 选择座位位置

### 订单管理

- **订单列表**: 查看个人所有订单
- **订单筛选**: 按状态筛选不同类型订单
- **订单详情**: 查看订单详细信息

### 支付流程 模拟

- **多种支付方式**: 支持支付宝、微信、信用卡等多种支付方式
- **支付倒计时**: 订单支付时间限制
- **支付确认**: 输入支付密码确认
- **支付结果**: 完整的支付结果页面展示

### 个人中心

- **用户信息**: 展示和编辑个人资料
- **订单快捷入口**: 快速查看订单
- **退出登录**: 安全退出账户

## 🔧 API架构

项目采用模块化API设计，主要包含以下几个模块：

1. **认证服务 (authService)**
   - 用户登录
   - Token管理

2. **用户服务 (userService)**
   - 用户注册
   - 获取用户信息
   - 更新用户信息

3. **活动服务 (eventService)**
   - 获取活动列表
   - 获取活动详情
   - 搜索活动

4. **订单服务 (orderService)**
   - 创建订单
   - 获取订单列表
   - 更新订单状态
   - 删除订单

所有API请求通过Axios进行封装，实现了请求拦截和响应拦截，统一处理认证和错误情况。

## 📱 页面路由

- **/** - 首页
- **/movie** - 电影页面
- **/concert** - 演唱会页面
- **/detail** - 活动详情页
- **/payment** - 支付页面 (私有路由)
- **/resultPage** - 支付结果页 (私有路由)
- **/profile** - 个人中心
- **/order** - 订单列表 (私有路由)
- **/login** - 登录/注册页面
- **/search** - 搜索页面

## 🚀 开始使用

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

### 打包项目
```bash
npm run build
```

### 预览打包后的项目
```bash
npm run preview
```



## 📄 许可证

[MIT License](LICENSE)

## 欢迎联系我
![image](https://github.com/user-attachments/assets/caf8ae0d-7f4f-47d1-aad9-2833cb2f0bc4)



<img src="https://github.com/user-attachments/assets/4af0d159-cb10-40b3-a904-cc60da54f3ad" width="200" > 

---

