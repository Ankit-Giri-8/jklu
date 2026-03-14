from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="VeriFlow Backend (Mock)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    claim: str

@app.post("/analyze")
async def analyze_claim(request: AnalyzeRequest):
    claim = request.claim
    print(f"\n[Mock API] Received claim: {claim}")

    # Return mock data matching the expected frontend format
    return {
        "verdict": "Misleading",
        "confidence": 72,
        "sentence_analysis": [
            {
                "sentence": claim[:100] if len(claim) > 100 else claim,
                "label": "UNCERTAIN",
                "confidence": 65,
                "reason": "This is mock data. Configure API keys to get real analysis."
            }
        ],
        "evidence": [
            {
                "source": "Example News Source",
                "quote": "This is a mock evidence quote. Configure GEMINI, TAVILY_API_KEY, and OPENROUTER_API_KEY in the .env file to get real results.",
                "url": "https://example.com",
            },
            {
                "source": "Mock Research Institute",
                "quote": "Another example evidence entry showing how the system presents verified sources.",
                "url": "https://example.org",
            }
        ],
        "triplets": [
            {"subject": "System", "relation": "requires", "object": "API Keys"},
            {"subject": "Mock Data", "relation": "demonstrates", "object": "Frontend Functionality"}
        ],
        "timeline": [
            {"time": "Now", "text": "Mock analysis completed successfully"},
            {"time": "Setup", "text": "Add API keys to enable real fact-checking"}
        ]
    }

@app.get("/")
async def root():
    return {"status": "VeriFlow Backend Running (Mock Mode)", "message": "Configure API keys for real analysis"}
