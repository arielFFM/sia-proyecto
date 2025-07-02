import requests

class LorinspectAPI:
    """Simple wrapper for Lorinspect API calls."""

    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        if token:
            self.session.headers.update({'Authorization': f'Bearer {token}'})

    def post(self, path: str, payload: dict) -> dict:
        url = f"{self.base_url}/{path.lstrip('/')}"
        response = self.session.post(url, json=payload)
        response.raise_for_status()
        return response.json()

    def create_param(self, data: dict) -> dict:
        return self.post('/params', data)

    def create_option(self, param_id: str, data: dict) -> dict:
        return self.post(f'/params/{param_id}/options', data)

    def create_asset(self, data: dict) -> dict:
        return self.post('/assets', data)

    def create_round(self, data: dict) -> dict:
        return self.post('/rounds', data)
