# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from genetic_algorithm import GeneticAlgorithm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/optimize")
async def optimize_schedule(config: dict):
    ga = GeneticAlgorithm(
        population_size=config.get("population_size", 100),
        generations=config.get("generations", 50),
    )
    best_solution, history = ga.run()
    return {"best_solution": best_solution, "history": history}


@app.get("/api/status")
async def get_status():
    return {"status": "running"}
