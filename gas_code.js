/**
 * 學生成績管理系統 - Google Apps Script 後端 API
 * 
 * 支援 CRUD 操作，並能自動在使用者 Google Drive 建立/連結名為 "StudentGradeSystemDatabase" 的試算表。
 */

// 取得或建立試算表及工作表
function getOrCreateSheet() {
  var properties = PropertiesService.getScriptProperties();
  var sheetId = properties.getProperty('SPREADSHEET_ID');
  var ss;
  
  if (sheetId) {
    try {
      ss = SpreadsheetApp.openById(sheetId);
    } catch (e) {
      // 若 ID 失效，清除之以重試
      properties.deleteProperty('SPREADSHEET_ID');
    }
  }
  
  if (!ss) {
    // 嘗試在雲端硬碟搜尋同名檔案
    var files = DriveApp.getFilesByName("StudentGradeSystemDatabase");
    if (files.hasNext()) {
      var file = files.next();
      sheetId = file.getId();
      properties.setProperty('SPREADSHEET_ID', sheetId);
      ss = SpreadsheetApp.openById(sheetId);
    } else {
      // 找不到則建立新檔案
      ss = SpreadsheetApp.create("StudentGradeSystemDatabase");
      sheetId = ss.getId();
      properties.setProperty('SPREADSHEET_ID', sheetId);
    }
  }
  
  var sheet = ss.getSheetByName("Grades");
  if (!sheet) {
    sheet = ss.insertSheet("Grades");
    // 初始化標頭欄位
    sheet.appendRow([
      "ID", 
      "StudentID", 
      "Name", 
      "Class", 
      "Math", 
      "English", 
      "Science", 
      "History", 
      "Average", 
      "Status", 
      "Notes", 
      "UpdatedAt"
    ]);
    // 刪除預設的 Sheet1 (若存在且非 Grades)
    var defaultSheet = ss.getSheetByName("工作表1") || ss.getSheetByName("Sheet1");
    if (defaultSheet && defaultSheet.getName() !== "Grades") {
      try {
        ss.deleteSheet(defaultSheet);
      } catch(e) {}
    }
  }
  return sheet;
}

// 產生隨機 UUID
function generateUUID() {
  return Utilities.getUuid();
}

// 輔助函式：建立 JSON 輸出，並處理 CORS
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 處理 GET 請求 - 讀取所有資料
 */
function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var list = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var item = {};
      for (var j = 0; j < headers.length; j++) {
        item[headers[j]] = row[j];
      }
      list.push(item);
    }
    
    return jsonResponse({
      success: true,
      data: list
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * 處理 POST 請求 - 新增 (create)、修改 (update)、刪除 (delete)
 */
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Missing payload" });
    }
    
    var payload = JSON.parse(e.postData.contents);
    var action = payload.action;
    var sheet = getOrCreateSheet();
    
    if (action === "create") {
      var studentData = payload.data;
      var id = generateUUID();
      var studentId = studentData.StudentID || "";
      var name = studentData.Name || "";
      var className = studentData.Class || "";
      var math = parseFloat(studentData.Math) || 0;
      var english = parseFloat(studentData.English) || 0;
      var science = parseFloat(studentData.Science) || 0;
      var history = parseFloat(studentData.History) || 0;
      
      var average = (math + english + science + history) / 4.0;
      var status = average >= 60 ? "及格" : "不及格";
      var notes = studentData.Notes || "";
      var updatedAt = new Date().toISOString();
      
      sheet.appendRow([
        id, 
        studentId, 
        name, 
        className, 
        math, 
        english, 
        science, 
        history, 
        average, 
        status, 
        notes, 
        updatedAt
      ]);
      
      return jsonResponse({
        success: true,
        data: { id: id, average: average, status: status }
      });
      
    } else if (action === "update") {
      var studentData = payload.data;
      var id = studentData.ID;
      if (!id) {
        return jsonResponse({ success: false, error: "Missing record ID for update" });
      }
      
      var data = sheet.getDataRange().getValues();
      var rowIndex = -1;
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === id) {
          rowIndex = i + 1; // 轉為 1-based index
          break;
        }
      }
      
      if (rowIndex === -1) {
        return jsonResponse({ success: false, error: "Record not found" });
      }
      
      var studentId = studentData.StudentID || "";
      var name = studentData.Name || "";
      var className = studentData.Class || "";
      var math = parseFloat(studentData.Math) || 0;
      var english = parseFloat(studentData.English) || 0;
      var science = parseFloat(studentData.Science) || 0;
      var history = parseFloat(studentData.History) || 0;
      
      var average = (math + english + science + history) / 4.0;
      var status = average >= 60 ? "及格" : "不及格";
      var notes = studentData.Notes || "";
      var updatedAt = new Date().toISOString();
      
      // 更新對應行
      sheet.getRange(rowIndex, 1, 1, 12).setValues([[
        id,
        studentId,
        name,
        className,
        math,
        english,
        science,
        history,
        average,
        status,
        notes,
        updatedAt
      ]]);
      
      return jsonResponse({
        success: true,
        data: { id: id, average: average, status: status }
      });
      
    } else if (action === "delete") {
      var id = payload.id;
      if (!id) {
        return jsonResponse({ success: false, error: "Missing record ID for delete" });
      }
      
      var data = sheet.getDataRange().getValues();
      var rowIndex = -1;
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === id) {
          rowIndex = i + 1;
          break;
        }
      }
      
      if (rowIndex === -1) {
        return jsonResponse({ success: false, error: "Record not found" });
      }
      
      sheet.deleteRow(rowIndex);
      return jsonResponse({ success: true, message: "Deleted successfully" });
      
    } else {
      return jsonResponse({ success: false, error: "Invalid action" });
    }
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.toString()
    });
  }
}
