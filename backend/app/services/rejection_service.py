import json
import random
import logging
import httpx
from pathlib import Path
from typing import List, Optional

from app.config import settings

logger = logging.getLogger(__name__)

GEMINI_PROMPT = (
    "Generate exactly ONE short, witty, sarcastic rejection reason — a single sentence, "
    "max 15 words. Something someone would say to decline a meeting or invitation. "
    "Be absurd and funny. No quotes, no explanation, just the one-liner."
)

GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-3.1-flash-lite-preview:generateContent"
)


class RejectionService:
    def __init__(self, data_path: Path):
        self.data_path = data_path
        self.reasons: List[str] = []
        self._load_data()
        self._gemini_ready = bool(settings.GEMINI_API_KEY)
        if self._gemini_ready:
            logger.info("Gemini API key configured. Will use AI-powered rejections.")
        else:
            logger.info("No GEMINI_API_KEY configured. Using JSON fallback only.")

    def _load_data(self):
        if not self.data_path.exists():
            raise FileNotFoundError(f"Data file not found at {self.data_path}")
        
        with open(self.data_path, "r", encoding="utf-8") as f:
            self.reasons = json.load(f)

    def _get_gemini_reason(self) -> Optional[str]:
        """Try to generate a rejection reason using Gemini REST API."""
        if not self._gemini_ready:
            return None
        try:
            url = f"{GEMINI_API_URL}?key={settings.GEMINI_API_KEY}"
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": GEMINI_PROMPT}
                        ]
                    }
                ]
            }
            response = httpx.post(url, json=payload, timeout=15.0)
            response.raise_for_status()
            data = response.json()
            reason = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            if reason:
                logger.info("Rejection reason generated via Gemini API.")
                return reason
            return None
        except Exception as e:
            logger.warning(f"Gemini API call failed: {e}. Falling back to JSON.")
            return None

    def _get_json_reason(self) -> Optional[str]:
        """Get a random rejection reason from the JSON file."""
        if not self.reasons:
            return None
        return random.choice(self.reasons)

    def get_random_reason(self) -> Optional[str]:
        """
        Get a rejection reason. Tries Gemini API first, 
        falls back to JSON file if Gemini is unavailable or fails.
        """
        # Try Gemini first
        reason = self._get_gemini_reason()
        if reason:
            return reason

        # Fallback to JSON
        logger.info("Using JSON fallback for rejection reason.")
        return self._get_json_reason()