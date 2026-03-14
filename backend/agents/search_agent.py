import asyncio
from duckduckgo_search import DDGS

async def fetch_news_context(claim: str):
    """
    Uses DuckDuckGo Search to find real-time articles related to the claim.
    Returns a list of evidence dicts.
    """
    print(f"[Search Agent] Fetching real-time news for: {claim}")
    
    # We use a thread pool because DDGS is synchronous
    def _search():
        with DDGS() as ddgs:
            # Get top 3 news results. Use abbreviated query for better DDG hit rate.
            query = " ".join(claim.split()[:10]) 
            results = list(ddgs.news(query, max_results=3))
            return results
            
    try:
        results = await asyncio.to_thread(_search)
        
        evidence_list = []
        for res in results:
            evidence_list.append({
                "source": res.get("source", "Web Content"),
                "quote": res.get("body", "")[:200] + "...", 
                "url": res.get("url", "#"),
                "credibility": "TRUSTED" # We assume DDG News indexes somewhat reliable sources for the hackathon MVP
            })
            
        return evidence_list
    except Exception as e:
        print(f"[Search Agent] Error searching: {e}")
        # Fallback if DDG fails (e.g. rate limit)
        return [
             {
                "source": "Fallback Web Search",
                "quote": "Unable to fetch live news at this moment. Proceeding with language analysis only.",
                "url": "#",
                "credibility": "UNKNOWN"
            }
        ]
