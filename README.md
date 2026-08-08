<p align="center">
  <img src="Banner.jpeg" alt="No-as-a-Service Banner" width="100%">
</p>

# No-as-a-Service (NaaS)

> Because sometimes "no" needs an API.

A lightweight FastAPI microservice that generates random, creative, and occasionally questionable rejection reasons on demand.

Whether you're declining a meeting, avoiding plans, rejecting an invitation, or just need an excuse with questionable logic — NaaS has you covered.

---

## Features

- **Random Rejections** — Returns a different rejection reason on each request.
- **Clean JSON API** — Simple and predictable response schema.
- **Rate Limiting** — IP-based rate limiting using SlowAPI (120 requests/minute).
- **CORS Support** — Configured for integration with web applications and browser extensions.
- **Automatic API Documentation** — Interactive Swagger UI and OpenAPI specification via FastAPI.
- **Layered Architecture** — Separates routing, business logic, data models, and configuration.
- **Test Suite** — Endpoint and validation tests using Pytest and FastAPI's `TestClient`.

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

The API will be available at:

```text
http://127.0.0.1:8000
```

---

## API

### `GET /no`

Returns a random rejection reason.

**Request**

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

With the server running, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface allows you to explore and test the API directly from your browser.

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