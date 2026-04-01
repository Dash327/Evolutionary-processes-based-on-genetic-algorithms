Веб-приложение для демонстрации работы генетических алгоритмов в задачах организации.

## Описание

Приложение позволяет:
- Настраивать параметры генетического алгоритма
- Визуализировать эволюцию решений в реальном времени
- Экспортировать результаты оптимизации
- Сохранять историю запусков

##  Быстрый старт

### Backend (Python)

cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload