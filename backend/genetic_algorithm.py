import random


class GeneticAlgorithm:
    def __init__(self, population_size=100, generations=50):
        self.population_size = population_size
        self.generations = generations

    def random_solution(self):
        """Создает случайное решение"""
        return [random.randint(0, 1) for _ in range(10)]

    def calculate_fitness(self, solution):
        """Вычисляет приспособленность"""
        return sum(solution)

    def tournament_selection(self, population, tournament_size=5):
        """Турнирная селекция"""
        tournament = random.sample(population, tournament_size)
        return max(tournament, key=self.calculate_fitness)

    def random_gene(self):
        """Создает случайный ген"""
        return random.randint(0, 1)

    def create_population(self):
        """Создание начальной популяции"""
        return [self.random_solution() for _ in range(self.population_size)]

    def crossover(self, parent1, parent2):
        """Скрещивание"""
        point = random.randint(1, len(parent1) - 1)
        return parent1[:point] + parent2[point:]

    def mutate(self, solution, rate=0.01):
        """Мутация"""
        for i in range(len(solution)):
            if random.random() < rate:
                solution[i] = self.random_gene()
        return solution

    def run(self):
        """Запуск ГА"""
        population = self.create_population()
        history = []

        for generation in range(self.generations):
            fitness_scores = [self.calculate_fitness(sol) for sol in population]
            best = max(population, key=self.calculate_fitness)
            history.append(
                {
                    "generation": generation,
                    "best_fitness": self.calculate_fitness(best),
                    "avg_fitness": sum(fitness_scores) / len(fitness_scores),
                }
            )

            new_population = [
                self.tournament_selection(population)
                for _ in range(self.population_size)
            ]

            new_population = [
                self.crossover(new_population[i], new_population[i + 1])
                for i in range(0, len(new_population) - 1, 2)
            ]

            population = [self.mutate(sol) for sol in new_population]

        return max(population, key=self.calculate_fitness), history
