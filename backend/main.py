from fastapi import FastAPI
from apps.KickStart.routes import router
from fastapi.middleware.cors import CORSMiddleware
from config import conn


app = FastAPI(title="Checklist")
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    if conn.is_closed():
        conn.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Closing...")
    if not conn.is_closed():
        conn.close()

