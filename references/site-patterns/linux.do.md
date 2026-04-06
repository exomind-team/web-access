---
domain: linux.do
aliases: [L站, linux do, linuxdo]
updated: 2026-04-06
---
## 平台特征
- Discourse 框架社区
- AI 友好社区，口号"学AI，上L站！"
- 有反 AI 内容政策：禁止 AI 生成内容，违规永久封号
- 支持用户搜索、话题搜索、标签搜索

## 有效模式
### 搜索
- 话题搜索：`https://linux.do/search?q=关键词`
- 用户搜索：`https://linux.do/search?q=关键词&search_type=users`
- 标签搜索：`https://linux.do/search?q=关键词&search_type=categories_tags`
- 排序参数：`order:latest`（最新）

### 用户主页
- URL 格式：`https://linux.do/u/用户名`
- 例如：`https://linux.do/u/ezez`

### 页面操作
- `/new` 创建新标签页
- `/navigate` 导航到 URL
- `/scroll` 滚动页面（触发懒加载）
- `/click` 点击元素（JS click）
- `/clickAt` 真实鼠标点击

## 已知陷阱
- `search_type=users` 参数需要登录态才能正确切换搜索类型
- 未登录时即使 URL 带此参数，仍显示话题/帖子结果
- 网站有严格反 AI 政策，Agent 操作时需注意
- 页面懒加载：需滚动后才能获取完整内容
- 部分链接 href 为空或无文本，需通过 `outerHTML` 查找

## 相关账号
- GitHub: `eze-is`（web-access 作者）
- L站: `ezez`（发布过 web-access 推广帖）
