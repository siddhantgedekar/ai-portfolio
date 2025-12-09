# 🧠 AI-Powered Knowledge Assistant

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey)
![Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange)

A Full-Stack Generative AI web application capable of context-aware conversations. This project integrates Google's **Gemini LLM** with a robust **Python Flask** backend and a responsive **JavaScript** frontend.

🔗 **Live Demo:** [https://wondersofsid.netlify.app/]

---

## 🚀 Key Features

* **Generative AI Integration:** Utilizes Google's Gemini API to provide intelligent, human-like responses to complex queries.
* **Context Awareness:** Implements session management to "remember" previous turns in the conversation, allowing for natural back-and-forth dialogue.
* **Markdown Rendering:** Dynamically parses and renders code blocks, lists, and bold text using `marked.js` for a cleaner UI.
* **Text-to-Speech (TTS):** Features a built-in voice synthesizer that reads AI responses aloud using the browser's Speech Synthesis API.
* **Secure Architecture:** API keys are secured server-side using Environment Variables, preventing client-side exposure.
* **Responsive Design:** Mobile-friendly chat interface built with CSS Flexbox.

---

## 🛠️ Tech Stack

### **Frontend**
* **HTML5 / CSS3:** Custom chat interface with "Speech Bubble" design.
* **JavaScript (ES6+):** Async/Await for API calls, DOM manipulation for real-time updates.
* **Marked.js:** For converting Markdown to HTML.

### **Backend**
* **Python:** Core logic and orchestration.
* **Flask:** Lightweight web server handling API routes and CORS policies.
* **Google Generative AI SDK:** Official library for interacting with the LLM.
* **Gunicorn:** Production-grade WSGI server for deployment.

### **Deployment**
* **Frontend:** Netlify (Static hosting)
* **Backend:** Render (Cloud application hosting)

---

## ⚙️ Installation & Setup

If you want to run this project locally, follow these steps:

**1. Clone the repository**
```bash
git clone https://github.com/siddhantgedekar/ai-portfolio.git
cd ai-portfolio