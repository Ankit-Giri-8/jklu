import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai
from openai import OpenAI

load_dotenv()

GEMINI_API_KEY     = os.getenv("GEMINI", "")
TAVILY_API_KEY     = os.getenv("TAVILY_API_KEY", "")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

# Validate required keys
missing = []
if not GEMINI_API_KEY:
    missing.append("GEMINI")
if not TAVILY_API_KEY:
    missing.append("TAVILY_API_KEY")
if not OPENROUTER_API_KEY:
    missing.append("OPENROUTER_API_KEY")

if missing:
    print(f"[Config] ⚠️  Missing environment variables: {', '.join(missing)}")
    print("[Config] Please check your .env file.")

genai.configure(api_key=GEMINI_API_KEY)
# We use gemini-2.5-flash for speed and enforce valid JSON output
gemini_model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"response_mime_type": "application/json"})

openrouter_client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)