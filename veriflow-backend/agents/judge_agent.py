import asyncio
import json
from config import gemini_model as model

async def generate_verdict(claim: str, evidence: list, triplets: list):
    """
    Uses Gemini 2.5 Flash to weigh the user's claim against the scraped DuckDuckGo evidence.
    Returns the final verdict, confidence, and sentence-level analysis.
    """
    print(f"[Judge Agent] Generating final verdict via Gemini 2.5 Flash...")
    
    # Format evidence for prompt
    evidence_text = "\n".join([f"- {e['source']}: {e['quote']}" for e in evidence])
    
    prompt = f"""
    You are an expert fact-checker AI. Analyze this claim against the provided real-time news evidence.
    
    CLAIM: "{claim}"
    
    EVIDENCE:
    {evidence_text}
    
    Respond STRICTLY in the following JSON format.
    {{
        "verdict": "Verified" | "Misleading" | "False",
        "confidence": <integer 0-100>,
        "sentence_analysis": [
            {{
                "sentence": "The exact sentence from the claim or full article",
                "label": "VERIFIED" | "UNCERTAIN" | "FALSE",
                "confidence": <integer 0-100>,
                "reason": "Short explanation why based on evidence"
            }}
        ]
    }}
    """
    
    try:
        def _call_gemini():
            response = model.generate_content(prompt)
            return response.text
            
        gemini_response = await asyncio.to_thread(_call_gemini)
        
        # Clean up in case
        cleaned_response = gemini_response.strip()
        verdict_data = json.loads(cleaned_response)
        
        return verdict_data
        
    except Exception as e:
        print(f"[Judge Agent] Error: {e}")
        return {
            "verdict": "Uncertain",
            "confidence": 50,
            "sentence_analysis": [
                {
                    "sentence": claim,
                    "label": "UNCERTAIN",
                    "confidence": 50,
                    "reason": f"API Error: {str(e)}"
                }
            ]
        }

