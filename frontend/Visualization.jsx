// frontend/src/Visualization.jsx
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Visualization({ history, bestSolution }) {
    // График эволюции фитнеса
    const fitnessData = {
        labels: history.map((h, i) => `Поколение ${i}`),
        datasets: [
            {
                label: 'Лучший фитнес',
                data: history.map(h => h.best_fitness),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
            },
            {
                label: 'Средний фитнес',
                data: history.map(h => h.avg_fitness),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            }
        ]
    };

    const fitnessOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Эволюция фитнес-функции' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    // Визуализация лучшего решения
    const solutionData = {
        labels: bestSolution.map((_, i) => `Ген ${i}`),
        datasets: [{
            label: 'Значения генов',
            data: bestSolution,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    };

    return (
        <div className="visualization">
            <h2> Визуализация результатов</h2>

            <div className="chart-container">
                <Line data={fitnessData} options={fitnessOptions} />
            </div>

            <div className="chart-container">
                <Bar data={solutionData} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Лучшее решение (хромосома)' }
                    }
                }} />
            </div>

            <div className="stats">
                <h3> Статистика</h3>
                <p>Поколений: {history.length}</p>
                <p>Лучший фитнес: {history[history.length - 1]?.best_fitness}</p>
                <p>Улучшение: {((history[history.length - 1]?.best_fitness - history[0]?.best_fitness) / history[0]?.best_fitness * 100).toFixed(2)}%</p>
            </div>
        </div>
    );
}