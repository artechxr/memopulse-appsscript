// --- CONFIGURATION ---
var API_KEY = "YOUR_GOOGLE_API_KEY"; // Paste your AI Studio Key here
var MODEL_NAME = "gemini-2.5-flash";

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('MemoPulse')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processForm(formObject) {
  try {
    var fileBlob = formObject.audioFile;
    var recipient = formObject.email;
    
    // 1. Validation
    if (!fileBlob || !recipient) {
      throw new Error("Missing file or email.");
    }

    // 2. Prepare Audio for Gemini (Base64 Encoding)
    // Note: Apps Script works best with files under 10MB using this method.
    var base64Data = Utilities.base64Encode(fileBlob.getBytes());
    var mimeType = fileBlob.getContentType();

    // 3. Call Gemini API
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL_NAME + ":generateContent?key=" + API_KEY;
    
    var payload = {
      "contents": [{
        "parts": [
          {
            "text": "You are a professional secretary. Listen to this meeting audio. Generate a professional HTML summary. Structure: <h3>Meeting Summary</h3> <p>...</p> <h3>Action Items</h3> <ul><li>...</li></ul> Return raw HTML only. Do not use markdown blocks."
          },
          {
            "inline_data": {
              "mime_type": mimeType,
              "data": base64Data
            }
          }
        ]
      }]
    };

    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    if (json.error) {
      throw new Error(json.error.message);
    }

    var htmlContent = json.candidates[0].content.parts[0].text;

    // 4. Send Email (Using built-in GmailApp)
    GmailApp.sendEmail(recipient, "Meeting Minutes - MemoPulse", "Please enable HTML email to view this.", {
      htmlBody: htmlContent,
      name: "MemoPulse App"
    });

    return { status: "success", preview: htmlContent };

  } catch (e) {
    return { status: "error", message: e.toString() };
  }
}