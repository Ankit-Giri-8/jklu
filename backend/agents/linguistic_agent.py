import asyncio

async def analyze(claim: str):
    await asyncio.sleep(0.5) # Simulate NLP delay
    return {
        "emotion_score": 0.85,
        "manipulation_score": 0.72,
        "tone": "Sensationalist"
    }
