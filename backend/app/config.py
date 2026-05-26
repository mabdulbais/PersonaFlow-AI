from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    anthropic_api_key: str | None = None
    anthropic_model: str = "claude-sonnet-4-6"

    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    rate_limit_per_minute: int = 30

    host: str = "0.0.0.0"
    port: int = 8000

    @classmethod
    def _parse_csv(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, list):
            return value
        return [item.strip() for item in value.split(",") if item.strip()]


settings = Settings()
# pydantic-settings only splits comma strings for List[str] via a custom parser;
# do it explicitly so CORS_ORIGINS="a,b,c" works as expected.
if isinstance(settings.cors_origins, str):  # type: ignore[unreachable]
    settings.cors_origins = Settings._parse_csv(settings.cors_origins)  # type: ignore[unreachable]
