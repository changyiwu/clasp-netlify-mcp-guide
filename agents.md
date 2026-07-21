# clasp-netlify-mcp-guide（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
作為 Google Apps Script (clasp) 與 Netlify MCP 的整合指南專案。

## 關鍵時程

## 目標與路線圖
- [x] 專案基礎建設與 GitHub Repo 連結
- [x] Obsidian L3 專案工作流程筆記規格調整
- [ ] clasp 與 Netlify MCP 指南文件補全

## 資料夾結構
- `.clasp.json`: clasp 設定檔
- `.claspignore`: clasp 忽略規則
- `ANTIGRAVITY.md`: Antigravity 設定檔
- `README.md`: 專案說明文件
- `appsscript.json`: GAS 專案設定檔
- `gas_code.js`: GAS 主要程式碼
- `package.json`: Node 專案設定檔
- `web/`: 前端網頁靜態資源

## 同步層級（本專案初始化至第 3 層級）

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（GDrive） | `agents.md`＋`handoff.md` | 每個 session |
| L2 | GitHub | changyiwu/clasp-netlify-mcp-guide | 指定時 |
| L3 | Obsidian | clasp-netlify-mcp-guide/專案工作流程.md | 有需要時 |

## 工作約定
- 任何 Agent、任何電腦：**開工先讀 `handoff.md`，收工必更新 `handoff.md`**
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更
- 所有回應與文件使用繁體中文
- 修改前先確認計畫，優先保留原有資料結構
