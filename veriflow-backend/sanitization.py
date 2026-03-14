import re

def sanitization_agent(state: dict) -> dict:
    query = state.get("claim", "")

    query = re.sub(r'<.*?>', '', query)
    query = re.sub(r'[^\w\s?.!]', '', query)
    query = query.strip()

    if len(query) < 5:
        return {**state, "error": "Query too short after sanitization."}
    if len(query) > 300:
        query = query[:300]

    print(f"[Sanitize] ✅ Clean claim: {query}")
    return {**state, "claim": query}