# 全站优化 Plan 方案

## 1. 现状分析 (Status Analysis)

### 1.1 代码结构与质量
- **冗余代码**: 导航栏 (Nav) 和页脚 (Footer) 在所有 HTML 文件中重复硬编码，维护成本高。
- **资源未关联**: `styles.css` 和 `script.js` 文件存在于项目中，但 `index.html` 未引入，导致部分预定义的样式和交互逻辑（如滚动显现、3D倾斜）未生效。
- **内联代码**: `index.html` 包含大量内联 `<style>` 和 `<script>`，不利于缓存和管理。
- **Mobile 适配 Bug**: 移动端菜单按钮 (`lucide:menu`) 存在，但没有任何 JavaScript 逻辑来响应点击事件，导致移动端无法展开菜单。

### 1.2 性能瓶颈
- **渲染阻塞**: Tailwind CSS 和 Iconify 的 CDN 脚本在 `<head>` 中加载，可能阻塞首屏渲染。
- **图片加载**: 页面图片未开启懒加载 (`loading="lazy"`)，且可能缺少显式宽高导致布局偏移 (CLS)。
- **事件监听**: `scroll` 事件监听器未做节流 (Throttle) 或防抖 (Debounce) 处理，高频触发可能导致页面滚动卡顿。

## 2. 任务拆解 (Task Breakdown)

### Phase 1: 核心修复与重构 (Core Fixes & Refactoring) - **P0 (最高优先级)**
*目标：修复移动端交互，消除代码冗余，统一代码规范。*
1.  **关联资源**: 在 `index.html` 中正确引入 `styles.css` 和 `script.js`。
2.  **代码迁移**: 将 `index.html` 中的内联样式迁移至 `styles.css`，内联脚本迁移至 `script.js`。
3.  **组件化重构**: 创建 `components.js`，将导航栏 (Nav) 和页脚 (Footer) 封装为 JS 组件，并在所有页面动态渲染。
4.  **修复 Mobile 菜单**: 在 `script.js` 中实现移动端菜单的点击切换逻辑 (Toggle)。

### Phase 2: 性能优化 (Performance Optimization) - **P1**
*目标：提升加载速度，优化 Lighthouse 指标。*
1.  **图片优化**: 为首屏以下的所有 `<img>` 标签添加 `loading="lazy"` 属性；为所有图片添加 `width` 和 `height` 属性（或比例类）以减少 CLS。
2.  **脚本优化**: 优化滚动监听逻辑，使用 `IntersectionObserver` 替代 `scroll` 事件（`script.js` 中已有类似逻辑，需激活并测试）。
3.  **资源加载**: 尝试将非关键 JS (如 Iconify) 移动到 `</body>` 前或添加 `defer` 属性。

### Phase 3: UI/UX 体验升级 (UI/UX Enhancements) - **P2**
*目标：激活现有特效，提升交互质感。*
1.  **激活特效**: 确保 `script.js` 中的 `.reveal` (滚动渐显) 和 `.avatar-stage` (3D 倾斜) 效果在页面中正确应用。
2.  **交互反馈**: 检查按钮和链接的 Hover 态，确保移动端触摸无延迟。

## 3. 风险与回滚方案 (Risk & Rollback)

- **风险点**: 
    - JS 动态渲染导航栏可能会有短暂的闪烁 (FOUC)，需通过 CSS 预留高度解决。
    - 修改公共组件可能导致个别详情页样式错乱。
- **回滚方案**:
    - 本地 Git 版本控制：在执行每个 Phase 前进行 Git Commit。
    - 若出现严重白屏或样式崩坏，执行 `git checkout .` 恢复到上一个稳定状态。

## 4. 验收标准 (Acceptance Criteria)

1.  **功能**: 移动端汉堡菜单点击可正常展开/收起；导航栏在所有页面显示一致。
2.  **性能**: 首屏无明显布局偏移 (CLS)；Lighthouse 性能评分达到 90+ (取决于网络环境，以优化动作为主)。
3.  **代码**: `index.html` 无大段内联样式/脚本；公共组件复用率 100%。
4.  **无错**: 控制台 (Console) 无红色报错。

---

**下一步行动**: 确认方案无误后，我将从 **Phase 1: 核心修复与重构** 开始执行。
