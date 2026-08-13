<p align="center">
  <img src="Banner.jpeg" alt="No-as-a-Service Banner" width="100%">
</p>

# No-as-a-Service (NaaS)

> Because sometimes "no" needs an API.

A lightweight FastAPI microservice that generates random, creative, and occasionally questionable rejection reasons on demand — now powered by **Gemini AI** with a JSON fallback.

Whether you're declining a meeting, avoiding plans, rejecting an invitation, or just need an excuse with questionable logic — NaaS has you covered.

---

## Live API

The API is publicly deployed and ready to use.

**Base URL:**  
https://no-as-a-service.onrender.com

**Rejection endpoint:**  
https://no-as-a-service.onrender.com/no

---

## Features

- **AI-Powered Rejections** — Uses Gemini AI to generate unique, sarcastic rejection reasons.
- **Reliable Fallback** — Falls back to a curated JSON dataset if Gemini is unavailable.
- **Creative Frontend** — A dark, sarcastic single-page app to generate rejections visually.
- **Clean JSON API** — Simple and predictable response schema.
- **Rate Limiting** — IP-based rate limiting using SlowAPI (120 requests/minute).
- **CORS Support** — Configured for integration with web applications and browser extensions.
- **Layered Architecture** — Separates routing, business logic, data models, and configuration.
- **Test Suite** — Endpoint and validation tests using Pytest and FastAPI's `TestClient`.
- **Public Deployment** — Backend on Render, frontend on Vercel.

---

## Tech Stack

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| Python 3.11+     | Programming language                 |
| FastAPI          | Web framework                        |
| Gemini AI        | AI-powered rejection generation      |
| Pydantic v2      | Data validation and models           |
| Uvicorn          | ASGI server                          |
| SlowAPI          | Rate limiting                        |
| Pytest           | Testing                             |
| HTML/CSS/JS      | Frontend                             |
| Render           | Backend deployment                   |
| Vercel           | Frontend deployment                  |

---

## Project Structure

```text
no-as-a-service/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── reason.py
│   │   ├── routers/
│   │   │   └── rejection.py
│   │   ├── services/
│   │   │   └── rejection_service.py
│   │   ├── config.py
│   │   └── main.py
│   ├── data/
│   │   └── reasons.json
│   ├── tests/
│   │   └── test_rejection.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Banner.jpeg
│
├── .env.example
├── .gitignore
├── Banner.jpeg
└── README.md
```

### Architecture

```text
Request
   │
   ▼
Router
   │
   ▼
Service ──► Gemini AI (primary)
   │              │
   │         (on failure)
   │              │
   │              ▼
   └──────► JSON Fallback
   │
   ▼
JSON Response
```

---

## Quickstart

### Clone the repository

```bash
git clone https://github.com/NomadBeetle/no-as-a-service.git
cd no-as-a-service
```

### Backend Setup

```bash
cd backend
```

**Create a virtual environment:**

**Windows**

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Configure environment:**

```bash
cp .env.example .env
```

Open `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

> 💡 **Get a free Gemini API key** at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)  
> If you skip this step, the app still works — it falls back to the JSON file.

**Start the server:**

```bash
python -m uvicorn app.main:app --reload
```

The API will be available locally at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

The frontend is a static site — just open it in your browser:

```bash
cd frontend
# Open index.html in your browser, or use a local server:
python -m http.server 3000
```

Visit `http://localhost:3000` in your browser.

> **Note:** By default, the frontend points to the deployed API at `https://no-as-a-service.onrender.com`. To use your local backend, update `API_BASE_URL` in `frontend/script.js`.

---

## API

### `GET /`

Returns a simple welcome message.

**Production**

```text
https://no-as-a-service.onrender.com/
```

**Local**

```text
http://127.0.0.1:8000/
```

---

### `GET /no`

Returns a random rejection reason (Gemini AI first, JSON fallback if needed).

**Production**

```bash
curl https://no-as-a-service.onrender.com/no
```

**Local**

```bash
curl http://127.0.0.1:8000/no
```

**Response**

```json
{
  "reason": "If I agree, it could break the space-time continuum."
}
```

Each request can return a different rejection.

---

## Running Tests

Run the complete test suite from the `backend` directory:

```bash
cd backend
python -m pytest
```

---

## Deployment Guide

### Backend on Render

1. **Connect your GitHub repo** to [Render](https://render.com).
2. **Create a new Web Service** with these settings:

   | Setting          | Value                                      |
   | ---------------- | ------------------------------------------ |
   | **Root Directory**   | `backend`                                  |
   | **Build Command**    | `pip install -r requirements.txt`          |
   | **Start Command**    | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
   | **Environment**      | `Python 3`                                 |

3. **Add environment variable** in the Render dashboard:
   - `GEMINI_API_KEY` = your Gemini API key

4. Deploy. Render will handle the rest.

### Frontend on Vercel

1. **Connect your GitHub repo** to [Vercel](https://vercel.com).
2. **Create a new project** with these settings:

   | Setting              | Value          |
   | -------------------- | -------------- |
   | **Root Directory**       | `frontend`     |
   | **Framework Preset**     | `Other`        |
   | **Build Command**        | *(leave empty)* |
   | **Output Directory**     | `.`            |

3. Deploy. Vercel will serve the static files.

> **Tip:** If you change the backend URL, update `API_BASE_URL` in `frontend/script.js` before deploying.

---

## Example Use Cases

NaaS can be integrated into:

- Chatbots
- Web applications
- Browser extensions
- Discord or Telegram bots
- Internal developer tools
- Anything that needs a professionally delivered "no"

For example:

```http
GET /no
```

```json
{
  "reason": "I'd love to, but my imaginary lawyer advised against it."
}
```

---

## Author

**Azaan Ahmed**

[GitHub](https://github.com/NomadBeetle)
