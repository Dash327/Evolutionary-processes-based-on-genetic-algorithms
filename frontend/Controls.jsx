// frontend/src/Controls.jsx
import React, { useState } from 'react';

export default function Controls({ onRun, isLoading }) {
    const [config, setConfig] = useState({
        population_size: 100,
        generations: 50,
        mutation_rate: 0.01,
        task_type: 'scheduling'
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRun(config);
    };

    return (
        <div className="controls">
            <h2>⚙️ Настройки алгоритма</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Размер популяции:</label>
                    <input
                        type="number"
                        name="population_size"
                        value={config.population_size}
                        onChange={handleChange}
                        min="10"
                        max="500"
                        step="10"
                    />
                </div>

                <div className="form-group">
                    <label>Количество поколений:</label>
                    <input
                        type="number"
                        name="generations"
                        value={config.generations}
                        onChange={handleChange}
                        min="10"
                        max="200"
                        step="10"
                    />
                </div>

                <div className="form-group">
                    <label>Вероятность мутации:</label>
                    <input
                        type="number"
                        name="mutation_rate"
                        value={config.mutation_rate}
                        onChange={handleChange}
                        min="0.001"
                        max="0.5"
                        step="0.001"
                    />
                </div>

                <div className="form-group">
                    <label>Тип задачи:</label>
                    <select name="task_type" value={config.task_type} onChange={handleChange}>
                        <option value="scheduling">Расписание</option>
                        <option value="routing">Маршрутизация</option>
                        <option value="assignment">Назначение</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading} className="run-button">
                    {isLoading ? '⏳ Выполнение...' : '🚀 Запустить оптимизацию'}
                </button>
            </form>

            <div className="presets">
                <h3>📋 Пресеты</h3>
                <button onClick={() => setConfig({
                    population_size: 50,
                    generations: 30,
                    mutation_rate: 0.01,
                    task_type: 'scheduling'
                })}>Быстрый</button>

                <button onClick={() => setConfig({
                    population_size: 200,
                    generations: 100,
                    mutation_rate: 0.005,
                    task_type: 'scheduling'
                })}>Точный</button>
            </div>
        </div>
    );
}