# 網站使用教學

這份文件將教你如何管理和更新「熊貓隨口說」個人網站的所有內容。

## 目錄

1. [網站結構概覽](#網站結構概覽)
2. [修改導航欄](#修改導航欄)
3. [部落格 vs 筆記的差異](#部落格-vs-筆記的差異)
4. [如何新增內容](#如何新增內容)
5. [修改首頁資訊](#修改首頁資訊)
6. [解決 404 問題](#解決-404-問題)

---

## 網站結構概覽

網站主要包含以下幾個區塊：

```
src/
├── content/              # 所有內容檔案
│   ├── blog/            # 部落格文章
│   ├── notes/           # 技術筆記
│   ├── bookmarks/       # 書籤收藏
│   ├── projects/        # 專案展示
│   ├── experience/      # 工作經歷
│   └── site/            # 網站設定
├── constants/           # 常數設定
│   ├── navigation.ts    # 導航欄設定
│   └── site.ts         # 網站基本資訊
└── pages/              # 頁面路由
```

---

## 修改導航欄

### 1. 修改導航項目名稱或連結

編輯 `src/constants/navigation.ts`：

```typescript
export const NAVIGATION: Navigation = [
    {
        name: "首頁",        // 顯示的名稱
        path: "/",          // 連結路徑
    },
    {
        name: "部落格",
        path: "/blog",
    },
    {
        name: "筆記",
        path: "/notes",
    },
    {
        name: "書籤",
        path: "/bookmarks",
    },
    {
        name: "電子報",
        path: "https://pdzeng.substack.com/",  // 外部連結
    },
];
```

### 2. 新增導航項目

在陣列中加入新的物件：

```typescript
{
    name: "關於我",
    path: "/about",
},
```

**注意**：如果是內部頁面，需要在 `src/pages/` 目錄下創建對應的 `.astro` 檔案。

---

## 部落格 vs 筆記的差異

### 部落格 (Blog)
- **用途**：完整的文章、深度分析、教學文章
- **特點**：
  - 有發布日期
  - 可設定草稿狀態
  - 適合較長篇幅的內容
  - 按時間排序顯示

### 筆記 (Notes)
- **用途**：快速記錄、技術片段、參考資料
- **特點**：
  - 有分類 (category)
  - 適合短篇、快速查閱的內容
  - 可以按分類瀏覽
  - 更像是個人知識庫

### 書籤 (Bookmarks)
- **用途**：收藏外部資源
- **特點**：
  - 連結到外部網站
  - 可分類為：文章 (article)、書籍 (book)、影片 (video)
  - 記錄作者和發布日期
  - 適合整理學習資源

---

## 如何新增內容

### 新增部落格文章

1. 在 `src/content/blog/` 目錄下創建新的 `.md` 檔案
2. 檔案名稱會成為 URL，例如：`my-first-post.md` → `/blog/my-first-post`

**範例**：`src/content/blog/my-first-post.md`

```markdown
---
title: "我的第一篇文章"
description: "這是文章的簡短描述"
publishedAt: 2024-12-26
draft: false
---

## 文章內容開始

這裡寫你的文章內容...

### 小標題

可以使用 Markdown 語法撰寫。
```

### 新增筆記

在 `src/content/notes/` 目錄下創建 `.md` 檔案：

```markdown
---
title: "React Hooks 使用技巧"
description: "常用的 React Hooks 整理"
publishedAt: 2024-12-26
category: "Frontend"
draft: false
---

## useState

基本用法...
```

**分類建議**：
- `Frontend` - 前端相關
- `Backend` - 後端相關
- `DevOps` - 部署運維
- `Development` - 開發工具

### 新增書籤

在 `src/content/bookmarks/` 目錄下創建 `.md` 檔案：

```markdown
---
title: "精通 TypeScript"
type: "book"
author: "作者名稱"
url: "https://example.com/typescript-book"
publishedAt: 2024-01-01
createdAt: 2024-12-26
description: "一本關於 TypeScript 的好書"
---
```

**type 選項**：
- `article` - 文章
- `book` - 書籍
- `video` - 影片

### 新增專案

在 `src/content/projects/` 目錄下創建 `.md` 檔案：

```markdown
---
title: "我的專案名稱"
description: "專案的詳細描述，說明這個專案做了什麼"
url: "https://github.com/username/project"
featured: true
techs: ["React", "TypeScript", "Node.js"]
---
```

**欄位說明**：
- `title`: 專案名稱
- `description`: 專案描述
- `url`: 專案連結（GitHub、Demo 網站等）
- `featured`: 是否在首頁顯示（true/false）
- `techs`: 使用的技術標籤陣列

### 新增工作經歷

在 `src/content/experience/` 目錄下創建 `.md` 檔案：

```markdown
---
title: "軟體工程師 at 公司名稱"
logo: "/images/companies/company-logo.svg"
description: "負責開發和維護公司的核心產品，使用 React 和 Node.js 建構全端應用..."
startDate: "2023-01-01"
endDate: "2024-12-31"
current: false
---

可以在這裡寫更詳細的工作內容...
```

**欄位說明**：
- `current`: 是否為目前工作（true 會顯示「至今」）
- `logo`: 公司 Logo 路徑（需放在 `public/images/companies/` 目錄）
- 日期格式：`YYYY-MM-DD`

---

## 修改首頁資訊

### 修改網站標題、副標題、自我介紹

編輯 `src/content/site/config.json`：

```json
{
  "home": {
    "name": "熊貓隨口說",
    "title": "區塊鏈 × 行銷 × 程式",
    "introduction": "2018 接觸區塊鏈，過程中點各式各樣的技能點做過 Marketing/Operations 的一個會寫點程式的資管生",
    "sections": {
      "blog": {
        "title": "部落格",
        "viewAllText": "查看所有文章"
      },
      "projects": {
        "title": "專案",
        "viewAllText": "查看所有專案"
      },
      "experience": {
        "title": "經歷",
        "viewAllText": "查看完整履歷"
      }
    },
    "socialLinks": [
      {
        "platform": "GitHub",
        "url": "https://github.com/panda850819"
      }
    ]
  }
}
```

### 新增社群媒體連結

在 `socialLinks` 陣列中加入：

```json
{
  "platform": "LinkedIn",
  "url": "https://linkedin.com/in/yourprofile"
}
```

---

## 解決 404 問題

### 為什麼會出現 404？

當你點擊「查看所有專案」或「查看完整履歷」時出現 404，是因為對應的頁面還不存在。

### 解決方法

#### 1. 創建專案列表頁面

創建 `src/pages/projects.astro`：

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../components/layout/BaseLayout.astro";
import Container from "../components/ui/Container.astro";

const projects = await getCollection("projects");
---

<BaseLayout title="專案" description="我的專案作品集">
  <Container>
    <h1>專案</h1>
    <div class="projects-list">
      {projects.map((project) => (
        <article>
          <h2>
            <a href={project.data.url} target="_blank" rel="noopener noreferrer">
              {project.data.title}
            </a>
          </h2>
          <p>{project.data.description}</p>
          {project.data.techs && (
            <div class="tags">
              {project.data.techs.map((tech) => (
                <span>{tech}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  </Container>
</BaseLayout>

<style>
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  article {
    padding: 1.5rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 8px;
  }

  h2 {
    margin: 0 0 1rem 0;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .tags span {
    padding: 0.25rem 0.75rem;
    background: var(--bg-secondary, #f3f4f6);
    border-radius: 4px;
    font-size: 0.875rem;
  }
</style>
```

#### 2. 創建經歷列表頁面

創建 `src/pages/experience.astro`：

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../components/layout/BaseLayout.astro";
import Container from "../components/ui/Container.astro";

const experiences = await getCollection("experience");
const sortedExperiences = experiences.sort(
  (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime()
);

const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "short",
  });
};
---

<BaseLayout title="工作經歷" description="我的專業經歷">
  <Container>
    <h1>工作經歷</h1>
    <div class="experience-list">
      {sortedExperiences.map((exp) => (
        <article>
          <div class="header">
            <img src={exp.data.logo} alt="" class="logo" />
            <div>
              <h2>{exp.data.title}</h2>
              <time>
                {formatDate(exp.data.startDate)} - {exp.data.current ? "至今" : formatDate(exp.data.endDate)}
              </time>
            </div>
          </div>
          <p>{exp.data.description}</p>
        </article>
      ))}
    </div>
  </Container>
</BaseLayout>

<style>
  .experience-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  article {
    padding: 1.5rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 8px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .logo {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }

  h2 {
    margin: 0;
  }

  time {
    font-size: 0.875rem;
    opacity: 0.7;
  }
</style>
```

---

## 常見問題

### Q: 如何修改網站的主色調？

編輯 `src/styles/` 目錄下的 CSS 檔案。

### Q: 如何讓文章不顯示在列表中？

在文章的 frontmatter 中設定 `draft: true`。

### Q: 日期格式可以改嗎？

可以！在 `src/pages/index.astro` 中修改 `formatDate` 函數。

### Q: 如何新增公司 Logo？

1. 將 Logo 圖片放到 `public/images/companies/` 目錄
2. 在經歷的 `.md` 檔案中引用：`logo: "/images/companies/your-logo.svg"`

### Q: 電子報連結可以改成其他外部連結嗎？

可以！在 `src/constants/navigation.ts` 中修改 `path` 為任何 URL。

---

## 開發流程

### 1. 啟動開發伺服器

```bash
pnpm dev
```

### 2. 新增或修改內容

在對應的 `src/content/` 目錄下編輯檔案。

### 3. 預覽變更

開啟 `http://localhost:4321` 查看效果。

### 4. 部署

```bash
pnpm build
```

---

## 需要幫助？

如果遇到問題，可以：

1. 檢查終端機的錯誤訊息
2. 確認檔案格式是否正確（YAML frontmatter）
3. 確認日期格式為 `YYYY-MM-DD`
4. 確認所有必填欄位都有填寫

---

**最後更新**：2024-12-26
