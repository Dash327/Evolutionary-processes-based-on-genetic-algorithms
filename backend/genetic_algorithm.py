# genetic_algorithm.py
import random

class GeneticAlgorithm:
    def __init__(self, population_size=100, generations=50):
        self.population_size = population_size
        self.generations = generations
    
    def create_population(self):
        # Создание начальной популяции
        return [random_solution() for _ in range(self.population_size)]
    
    def fitness(self, solution):
        # Оценка качества решения
        return calculate_fitness(solution)
    
    def select(self, population):
        # Селекция (турнирная или рулетка)
        return tournament_selection(population)
    
    def crossover(self, parent1, parent2):
        # Скрещивание
        point = random.randint(1, len(parent1)-1)
        return parent1[:point] + parent2[point:]
    
    def mutate(self, solution, rate=0.01):
        # Мутация
        for i in range(len(solution)):
            if random.random() < rate:
                solution[i] = random_gene()
        return solution
    
    def run(self):
        population = self.create_population()
        history = []
        
        for generation in range(self.generations):
            # Оценка
            fitness_scores = [self.fitness(sol) for sol in population]
            best = max(population, key=self.fitness)
            history.append({
                'generation': generation,
                'best_fitness': self.fitness(best),
                'avg_fitness': sum(fitness_scores) / len(fitness_scores)
            })
            
            # Селекция
            new_population = [self.select(population) for _ in range(self.population_size)]
            
            # Кроссовер
            new_population = [
                self.crossover(new_population[i], new_population[i+1])
                for i in range(0, len(new_population)-1, 2)
            ]
            
            # Мутация
            population = [self mutate(sol) for sol in new_population]
        
        return max(population, key=self.fitness), history