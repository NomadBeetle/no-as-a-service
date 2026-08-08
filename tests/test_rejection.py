from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome" in response.json()["message"]

def test_get_rejection():
    response = client.get("/no")
    assert response.status_code == 200
    data = response.json()
    assert "reason" in data
    assert isinstance(data["reason"], str)
    assert len(data["reason"]) > 0