<p align="center">
  <img src="Banner.jpeg" alt="No-as-a-Service Banner" width="100%">
</p>

# No-as-a-Service (NaaS)

> Because sometimes "no" needs an API.

A lightweight FastAPI microservice that generates random, creative, and occasionally questionable rejection reasons on demand.

Whether you're declining a meeting, avoiding plans, rejecting an invitation, or just need an excuse with questionable logic — NaaS has you covered.

---

## Live API

The API is publicly deployed and ready to use.

**Base URL:**  
https://no-as-a-service.onrender.com

**Rejection endpoint:**  
https://no-as-a-service.onrender.com/no

**Interactive API documentation:**  
https://no-as-a-service.onrender.com/docs

---

## Features

- **Random Rejections** — Returns a different rejection reason on each request.
- **Clean JSON API** — Simple and predictable response schema.
- **Rate Limiting** — IP-based rate limiting using SlowAPI (120 requests/minute).
- **CORS Support** — Configured for integration with web applications and browser extensions.
- **Automatic API Documentation** — Interactive Swagger UI and OpenAPI specification via FastAPI.
- **Layered Architecture** — Separates routing, business logic, data models, and configuration.
- **Test Suite** — Endpoint and validation tests using Pytest and FastAPI's `TestClient`.
- **Public Deployment** — Hosted and accessible through Render.

---

## Tech Stack

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| Python 3.11+ | Programming language       |
| FastAPI      | Web framework              |
| Pydantic v2  | Data validation and models |
| Uvicorn      | ASGI server                |
| SlowAPI      | Rate limiting              |
| Pytest       | Testing                    |
| HTTPX        | HTTP client and testing    |
| Render       | Cloud deployment           |

---

## Project Structure

```text
no-as-a-service/
│
├── app/
│   ├── models/
│   │   └── reason.py
│   │
│   ├── routers/
│   │   └── rejection.py
│   │
│   ├── services/
│   │   └── rejection_service.py
│   │
│   ├── config.py
│   └── main.py
│
├── data/
│   └── reasons.json
│
├── tests/
│   └── test_rejection.py
│
├── .gitignore
├── Banner.jpeg
├── README.md
└── requirements.txt
```

The application follows a simple separation of concerns:

```text
Request
   │
   ▼
Router
   │
   ▼
Service
   │
   ▼
Data / Model
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

### Create a virtual environment

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

### Install dependencies

```bash
pip install -r requirements.txt
```

### Start the server

```bash
python -m uvicorn app.main:app --reload
```

The API will be available locally at:

```text
http://127.0.0.1:8000
```

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

Returns a random rejection reason.

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

### `GET /docs`

FastAPI automatically generates interactive API documentation.

Open the Swagger interface at:

```text
https://no-as-a-service.onrender.com/docs
```

The documentation allows you to explore and test the API directly from your browser.

For local development:

```text
http://127.0.0.1:8000/docs
```

---

## Running Tests

Run the complete test suite with:

```bash
python -m pytest
```

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
