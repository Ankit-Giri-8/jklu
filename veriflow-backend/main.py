import asyncio
import nest_asyncio
nest_asyncio.apply()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from orchestrator import graph
from config import gemini_model
import json


app = FastAPI(title="VeriFlow Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    claim: str


from agents import triplet_agent, judge_agent

async def transform_response_async(claim: str, raw_result: dict) -> dict:
    """Transform LangGraph pipeline output using exactly the old Gemini agents."""
    evidence = raw_result.get("evidence", [])

    # Format evidence for the old agents
    agent_evidence_format = []
    frontend_evidence = []
    for ev in evidence:
        source_name = ev.get("title", ev.get("source", "Unknown"))
        quote = ev.get("article_content", "")[:300]
        agent_evidence_format.append({"source": source_name, "quote": quote})
        
        frontend_evidence.append({
            "source": source_name,
            "quote": quote + "...",
            "url": ev.get("url", "#"),
            "credibility": "TRUSTED"
        })

    # --- Triplet Agent (Exact Fallback) ---
    context_text = f"Claim: {claim}\n" + "\n".join([e["quote"] for e in agent_evidence_format])
    triplets = await triplet_agent.extract_triplets(context_text)

    # --- Judge Agent (Exact Fallback) ---
    verdict_data = await judge_agent.generate_verdict(claim, agent_evidence_format, triplets)

    # --- Timeline ---
    timeline = []
    if evidence:
        timeline.append({"time": "Live", "text": f"Scraped {len(evidence)} source(s) for cross-reference."})
        for i, ev in enumerate(evidence[:3]):
            timeline.append({"time": f"Source {i+1}", "text": f"{ev.get('source', 'Unknown')}: {ev.get('title', '')[:80]}"})
    else:
        timeline.append({"time": "Live", "text": "No evidence sources were found for this claim."})

    return {
        "verdict": verdict_data.get("verdict", "Uncertain"),
        "confidence": verdict_data.get("confidence", 50),
        "sentence_analysis": verdict_data.get("sentence_analysis", []),
        "evidence": frontend_evidence,
        "triplets": triplets,
        "timeline": timeline,
    }


@app.post("/analyze")
async def analyze_claim(request: AnalyzeRequest):
    claim = request.claim
    print(f"\n[API] Received claim: {claim}")

    input_data = {
        "claim": claim,
        "claims": [],
        "evidence": [],
        "results": [],
        "error": None,
    }

    result = await graph.ainvoke(input_data)

    if result.get("error"):
        return {"verdict": "Uncertain", "confidence": 0, "error": result["error"],
                "sentence_analysis": [], "evidence": [], "triplets": [], "timeline": []}

    return await transform_response_async(claim, result)


# Keep the CLI runner for standalone testing
def print_report(result: dict):
    print("\n" + "=" * 60)
    print("           VERIFLOW — FACT CHECK REPORT")
    print("=" * 60)
    print(f"\n📝 ORIGINAL CLAIM:\n   {result['claim']}")
    print(f"\n🔍 EVIDENCE FOUND ({len(result.get('evidence', []))} sources):")
    for i, ev in enumerate(result.get("evidence", []), 1):
        print(f"\n  [{i}] {ev['title']}")
        print(f"       Source : {ev['source']}")
        print(f"       URL    : {ev['url']}")
        print(f"       Snippet: {ev['article_content'][:180]}...")
    print(f"\n{'=' * 60}")
    print("📊 VERDICTS:")
    for r in result.get("results", []):
        verdict = r["verdict"]
        emoji = {"TRUE": "✅", "FALSE": "❌", "MISLEADING": "⚠️", "UNVERIFIED": "❓"}.get(verdict, "❓")
        print(f"\n  {emoji}  {verdict} ({r['confidence']}% confidence)")
        print(f"      Claim     : {r['claim']}")
        print(f"      Reasoning : {r['reasoning']}")
    print(f"\n{'=' * 60}\n")


async def run(claim: str):
    input_data = {"claim": claim, "claims": [], "evidence": [], "results": [], "error": None}
    result = await graph.ainvoke(input_data)
    final_output = await transform_response_async(claim, result)
    print_report(final_output)


if __name__ == "__main__":
    claim = "India won the 2026 T20 world cup"
    asyncio.run(run(claim))