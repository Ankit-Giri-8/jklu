def linguistic_agent(state: dict) -> dict:
    """
    Future agent: detect hedging language, subjectivity,
    emotional framing, or weasel words in the claim.
    """
    claim = state.get("claim", "")

    hedging_words = ["might", "could", "possibly", "allegedly", "reportedly"]
    flags = [w for w in hedging_words if w in claim.lower()]

    if flags:
        print(f"[Linguistic] ⚠️  Hedging words detected: {flags}")
    else:
        print(f"[Linguistic] ✅ No hedging words detected.")

    return {**state, "linguistic_flags": flags}