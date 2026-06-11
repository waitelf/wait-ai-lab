# wait-ai-lab
个人网站

## 如何新增一个项目

### 第一步：创建图片文件夹
在 `assets/images/projects/` 目录下创建一个与项目同名的文件夹：
`assets/images/projects/项目名/`

### 第二步：放入图片
将项目相关的图片放入该文件夹，并统一命名以便引用：
- `cover.jpg` (封面图)
- `screenshot-1.jpg` (截图 1)
- `screenshot-2.jpg` (截图 2)
...

### 第三步：复制模板
复制 `templates/project-template.html` 文件，保存到 `projects/` 目录下，并重命名为 `项目名.html`。

### 第四步：修改内容
打开新创建的 `projects/项目名.html`，修改以下内容：
- `<title>` 标签中的项目名称
- `<meta name="description">`、`canonical`、`og:title`、`og:description`、`og:image` 等分享信息
- `<h1>` 项目标题
- `<p>` 项目一句话介绍
- 图片路径：将 `项目名` 替换为实际的文件夹名称
- 项目背景、解决方案等文字内容

### 第五步：在首页和作品集页新增入口
打开 `index.html` 和 `portfolio.html`，在相应的项目板块复制一个现有的项目卡片代码块，修改其：
- 图片路径：`./assets/images/projects/项目名/cover.jpg`
- 链接地址：`projects/项目名.html`
- 标题和描述文字
- 标签、角色说明和关键结果，保持和详情页一致

### 第六步：检查导航与部署
- 本地检查链接是否能从首页、作品集页进入项目详情页
- 如果新增了图片，优先压缩到适合网页展示的大小
- 提交并推送到 GitHub 后，再确认线上 `wait-ai.com` 是否同步更新
