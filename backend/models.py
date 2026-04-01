# backend/models.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class GAConfig(BaseModel):
    """Конфигурация генетического алгоритма"""

    population_size: int = 100
    generations: int = 50
    mutation_rate: float = 0.01
    crossover_rate: float = 0.8
    task_type: str = "scheduling"  # scheduling, routing, assignment


class Individual(BaseModel):
    """Особь (решение)"""

    genes: List[int]
    fitness: float = 0.0


class GAResult(BaseModel):
    """Результат выполнения ГА"""

    best_solution: List[int]
    best_fitness: float
    generations_run: int
    history: List[dict]
    execution_time: float


class ScheduleTask(BaseModel):
    """Задача для оптимизации расписания"""

    teachers: List[str]
    groups: List[str]
    rooms: List[str]
    time_slots: List[str]
    constraints: Optional[dict] = {}


class HistoryRecord(BaseModel):
    """Запись истории для БД"""

    id: Optional[int] = None
    task_type: str
    config: dict
    best_fitness: float
    created_at: datetime = datetime.now()
