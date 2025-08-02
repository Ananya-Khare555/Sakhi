# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from omnidimension import Client
import os
from dotenv import load_dotenv
load_dotenv()

client = Client(os.getenv("OMNIDIM_API_KEY"))

app = FastAPI()

# ✅ Allow frontend (React) to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI backend for Sakhi is running!"}

@app.post("/start-agent")
async def start_agent():
    try:
        response = client.agent.create(
            name="RoomMateAssist",
            welcome_message="Hi there, welcome to RoomMateAssist! How can I help you find the perfect hostel room or roommate today?",
            context_breakdown=[
                {"title": "Introduction", "body": "Start with: 'Hi there...'", "is_enabled": True},
                {"title": "Understanding Needs", "body": "Ask open-ended...", "is_enabled": True},
                {"title": "Information Gathering", "body": "Confirm the details...", "is_enabled": True},
                {"title": "Solution Provision", "body": "Suggest suitable options...", "is_enabled": True},
                {"title": "Closing", "body": "Summarize and thank...", "is_enabled": True}
            ],
            call_type="Incoming",
            transcriber={
                "provider": "deepgram_stream",
                "silence_timeout_ms": 400,
                "model": "nova-3",
                "numerals": True,
                "punctuate": True,
                "smart_format": True,
                "diarize": False
            },
            model={
                "model": "azure-gpt-4o-mini",
                "temperature": 0.7
            },
            voice={
                "provider": "eleven_labs",
                "voice_id": "cgSgspJ2msm6clMCkdW9"
            },
        )
        return {"status": "success", "data": response}
    except Exception as e:
        return {"status": "error", "message": str(e)}
