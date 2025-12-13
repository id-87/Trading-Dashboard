import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",  # Vite
        "http://localhost:3000",  # CRA (optional)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = pd.read_csv("data/stock.csv")
df["date"] = pd.to_datetime(df["date"])

@app.get("/ohlc")
def get_ohlc(limit: int = 300):
    data = df.tail(limit)

    return [
        {
            "time": int(row["date"].timestamp()),
            "open": row["open"],
            "high": row["high"],
            "low": row["low"],
            "close": row["close"]
        }
        for _, row in data.iterrows()
    ]
