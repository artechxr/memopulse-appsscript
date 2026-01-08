# MemoPulse⚡

MemoPulse is an AI-powered meeting minutes generator that runs entirely on Google Apps Script. It uses **Google Gemini** to listen to audio files and email professional summaries to recipients.

### Features
- 🎙️ **Audio to Text:** Upload MP3 files directly.
- 🧠 **AI Analysis:** Uses Gemini 2.5 Flash for summarization.
- 📧 **Auto-Email:** Sends formatted HTML minutes via Gmail.
- ☁️ **Serverless:** Hosted 100% on Google Servers (No AWS/Render costs).

### How to Deploy
1. Go to [script.google.com](https://script.google.com/).
2. Create a new project.
3. Copy the content of `Code.js` into the script editor (rename it to Code.gs).
4. Create an HTML file named `Index.html` and paste the content of `index.html`.
5. Add your **Google Gemini API Key** in the configuration section.
6. Click **Deploy** -> **New Deployment** -> **Web App**.
