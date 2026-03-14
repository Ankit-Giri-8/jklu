import asyncio
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load key from .env
load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

# Create the model instance
# We use gemini-2.5-flash for speed during a hackathon demo
model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"response_mime_type": "application/json"})

async def extract_triplets(text: str):
    """
    Uses Gemini to extract subject-action-object triplets from text.
    Returns a list of dicts: {"subject": "...", "action": "...", "object": "..."}
    """
    print(f"[Triplet Agent] Extracting entities via Gemini...")
    
    prompt = f"""
    You are an AI tasked with transforming text into knowledge graph triplets.
    Extract the core claims from the following text into "subject", "action", and "object" format.
    Return ONLY a raw JSON array of objects. No markdown formatting, no code blocks, no explanation.
    
    Format:
    [
      {{"subject": "Entity 1", "action": "verb", "object": "Entity 2"}},
      {{"subject": "Context 1", "action": "did", "object": "Context 2"}}
    ]
    
    Text: {text}
    """
    
    try:
        def _call_gemini():
            response = model.generate_content(prompt)
            return response.text
            
        gemini_response = await asyncio.to_thread(_call_gemini)
        
        # Parse directly because mime_type guarantees JSON structure
        cleaned_response = gemini_response.strip()
        triplets = json.loads(cleaned_response)
        
        return triplets
        
    except Exception as e:
        print(f"[Triplet Agent] Error: {e}")
        return [
            {"subject": "Extraction", "action": "failed", "object": "API Error"}
        ]
