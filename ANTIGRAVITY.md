# Antigravity 指南: clasp-netlify-mcp-guide

這個專案是一個整合 **Clasp (Google Apps Script)** 與 **Netlify MCP** 的雙向閉環網頁系統範例。

## 專案概述
- **名稱**: clasp-netlify-mcp-guide
- **用途**: 作為 Google Apps Script 與 Netlify MCP 的整合指南專案，示範如何在不複製程式碼的情況下，利用 AI Agent 完成前端網頁與 GAS 後端資料庫的自動化串接、部署與版本管理。
- **技術棧**:
  - 前端: Vanilla HTML/CSS/JS (位於 `web/` 目錄)
  - 後端: Google Apps Script (主程式為 `gas_code.js`, 設定檔為 `appsscript.json`)
  - 工具: `@google/clasp` (GAS 本地開發部署工具), Netlify MCP (網頁自動部署與專案管理)

## 目錄結構
- `web/`: 存放前端網頁資源 (HTML, CSS, JS)
- `gas_code.js`: Apps Script 後端邏輯，與 Google Sheets 資料庫互動
- `appsscript.json`: Apps Script 專案設定檔 (Manifest)
- `.claspignore`: 排除 `web/` 等前端目錄，只推送 GAS 後端檔案
- `.gitignore`: Git 忽略清單 (忽略 `node_modules/`, `.clasp.json`, 敏感變數等)
- `README.md`: 使用者導向的安裝與避坑指南

## 開發與部署流程
1. **本地編輯**:
   - GAS 後端修改: 修改 `gas_code.js`
   - 前端修改: 修改 `web/` 下的檔案
2. **推送與部署 GAS**:
   - 執行 `npx clasp push -f` 將後端推送至 Google Apps Script 雲端
   - 執行 `npx clasp deploy` 生成新部署，並取得 `exec` 網址 (GAS Web App API URL)
   - 將 API URL 更新到前端程式碼中
3. **部署前端網頁**:
   - 使用 Netlify MCP 工具部署 `web/` 資料庫至 Netlify
   - 使用 `netlify-deploy-services-updater` 工具進行發佈

## 避坑指南與關鍵規則
- **嚴禁敏感資料提交**: `Netlify Personal Access Token`、`GITHUB_TOKEN` 等金鑰不應寫入程式碼或提交至 Git 倉庫。
- **防止前端檔案推送至 GAS**: 務必確保 `.claspignore` 包含 `web/`。
- **多帳號衝突**: 在實測 GAS 網頁串接時，建議使用瀏覽器的**無痕視窗**，避免 Google 多帳號 Session 衝突。
