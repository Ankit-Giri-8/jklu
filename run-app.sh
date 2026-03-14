#!/bin/bash

echo "Starting VeriFlow Application..."
echo "================================"

# Start backend (mock mode by default)
echo "[1/2] Starting Backend on port 8000..."
cd veriflow-backend
python3 -m uvicorn main_mock:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

sleep 3

# Test backend
echo "[Testing] Backend API..."
curl -s -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"claim":"test"}' | head -c 100

echo ""
echo "[2/2] Starting Frontend on port 3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "VeriFlow is now running!"
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "================================"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
