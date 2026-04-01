// App.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function App() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const runOptimization = async () => {
        setLoading(true);
        const response = await fetch('/api/optimize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                population_size: 100,
                generations: 50
            })
        });
        const data = await response.json();
        setResults(data);
        setLoading(false);
    };

    return (
        <div>
            <h1>Генетический алгоритм</h1>
            <button onClick={runOptimization} disabled={loading}>
                {loading ? 'Выполнение...' : 'Запустить оптимизацию'}
            </button>

            {results && (
                <div>
                    <h2>Лучшее решение: {results.best_solution}</h2>
                    <Line data={{
                        labels: results.history.map(h => h.generation),
                        datasets: [{
                            label: 'Фитнес',
                            data: results.history.map(h => h.best_fitness)
                        }]
                    }} />
                </div>
            )}
        </div>
    );
}