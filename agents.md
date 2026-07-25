# clasp-netlify-mcp-guide（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
整合 **Clasp（Google Apps Script）** 與 **Netlify MCP** 的雙向閉環網頁系統範例。示範如何在不複製程式碼的情況下，利用 AI Agent 完成前端網頁與 GAS 後端資料庫的自動化串接、部署與版本管理。

技術棧：

- 前端：Vanilla HTML／CSS／JS（位於 `web/`）
- 後端：Google Apps Script（主程式 `gas_code.js`，設定檔 `appsscript.json`）
- 工具：`@google/clasp`（GAS 本地開發部署）、Netlify MCP（網頁自動部署與專案管理）

## 關鍵時程

## 目標與路線圖
- [x] 專案基礎建設與 GitHub Repo 連結
- [x] Obsidian L3 專案工作流程筆記規格調整
- [ ] clasp 與 Netlify MCP 指南文件補全

## 資料夾結構
- `web/`：前端網頁靜態資源（HTML、CSS、JS）
- `gas_code.js`：Apps Script 後端邏輯，與 Google Sheets 資料庫互動
- `appsscript.json`：Apps Script 專案設定檔（Manifest）
- `.clasp.json`：clasp 設定檔
- `.claspignore`：排除 `web/` 等前端目錄，只推送 GAS 後端檔案
- `package.json`：Node 專案設定檔
- `README.md`：使用者導向的安裝與避坑指南
- `agents.md`：專案藍圖（本檔）
- `handoff.md`：交接檔（每次收工必更新）
- `.gitignore`：忽略 `node_modules/`、`.clasp.json` 與敏感變數

## 開發與部署流程

1. **本地編輯**：GAS 後端改 `gas_code.js`；前端改 `web/` 下的檔案
2. **推送與部署 GAS**：
   - `npx clasp push -f` 將後端推送至 Google Apps Script 雲端
   - `npx clasp deploy` 生成新部署，取得 `exec` 網址（GAS Web App API URL）
   - 將 API URL 更新到前端程式碼中
3. **部署前端網頁**：用 Netlify MCP 部署 `web/`，再以 `netlify-deploy-services-updater` 發佈

## 避坑指南與關鍵規則

- **嚴禁敏感資料提交**：`Netlify Personal Access Token`、`GITHUB_TOKEN` 等金鑰不可寫入程式碼或提交至 Git
- **防止前端檔案推送至 GAS**：務必確保 `.claspignore` 包含 `web/`
- **多帳號衝突**：實測 GAS 網頁串接時建議使用瀏覽器**無痕視窗**，避免 Google 多帳號 Session 衝突

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
