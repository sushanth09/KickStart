from fastapi import FastAPI
from apps.KickStart.routes import router
from fastapi.middleware.cors import CORSMiddleware
from config import conn
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="KickStart")
app.include_router(router, prefix="/kickstart")
# app.mount(
#     "/static",
#     StaticFiles(directory="static"),
#     name="static",
# )

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
