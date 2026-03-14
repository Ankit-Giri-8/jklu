# VeriFlow - Setup Guide

The frontend and backend are now connected and ready to work seamlessly together.

## Backend Setup

### Running the Mock Backend (No API Keys Required)

The mock backend is already running and provides sample data to test the frontend:

```bash
cd veriflow-backend
python3 -m uvicorn main_mock:app --host 0.0.0.0 --port 8000
```

**Backend Status**: http://localhost:8000

### Running the Full Backend (Requires API Keys)

To use the full fact-checking system with real AI analysis, you need to:

1. Create a `.env` file in the `veriflow-backend` directory with the following API keys:

```env
GEMINI=your_google_gemini_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

2. Run the full backend:

```bash
cd veriflow-backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```

## Frontend Setup

The frontend is configured to connect to the backend at `http://localhost:8000/analyze`.

### Development Mode

```bash
cd frontend
npm run dev
```

The app will be available at http://localhost:3000

### Production Build

```bash
cd frontend
npm run build
npm start
```

## How the Connection Works

1. **User submits a claim** on the frontend (`/frontend/src/app/page.tsx:frontend/src/app/page.tsx:19`)
2. **Frontend sends POST request** to `http://localhost:8000/analyze`
3. **Backend processes** the claim through the agent pipeline
4. **Backend returns JSON** with verdict, confidence, evidence, triplets, and timeline
5. **Frontend displays** results across three pages:
   - **Dashboard** (`/dashboard`) - Verdict, confidence gauge, sentence analysis
   - **Knowledge Graph** (`/graph`) - Triplets and timeline
   - **Sources** (`/sources`) - Evidence and citations

## Testing the Connection

With the backend running on port 8000, test the API:

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"claim":"Coffee helps you live longer"}'
```

Expected response format:
```json
{
  "verdict": "Misleading",
  "confidence": 72,
  "sentence_analysis": [...],
  "evidence": [...],
  "triplets": [...],
  "timeline": [...]
}
```

## Architecture

```
┌──────────────┐         HTTP POST          ┌───────────────┐
│              │  /analyze {claim: "..."}   │               │
│   Frontend   │  ─────────────────────────▶│   Backend     │
│   (Next.js)  │                            │   (FastAPI)   │
│              │◀─────────────────────────── │               │
│   Port 3000  │  JSON Response             │   Port 8000   │
└──────────────┘                            └───────────────┘
       │                                            │
       │                                            │
       ▼                                            ▼
┌──────────────┐                            ┌───────────────┐
│              │                            │   Agent       │
│  Dashboard   │                            │   Pipeline    │
│  Graph View  │                            │   - Search    │
│  Sources     │                            │   - Verify    │
└──────────────┘                            │   - Judge     │
                                            └───────────────┘
```

## Current Status

- Backend (Mock): Running on port 8000
- Frontend: Ready for development (port 3000)
- Connection: Fully configured
- Mock Data: Available for immediate testing
