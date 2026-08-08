import json
import random
from pathlib import Path
from typing import List, Optional

class RejectionService:
    def __init__(self, data_path: Path):
        self.data_path = data_path
        self.reasons: List[str] = []
        self._load_data()

    def _load_data(self):
        if not self.data_path.exists():
            raise FileNotFoundError(f"Data file not found at {self.data_path}")
        
        with open(self.data_path, "r", encoding="utf-8") as f:
            self.reasons = json.load(f)

    def get_random_reason(self) -> Optional[str]:
        if not self.reasons:
            return None
        return random.choice(self.reasons)