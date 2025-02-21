export const defaultExercises = [
  {
    id: 1,
    title: "Приседания",
    description: "Упражнение для ног и ягодиц.",
    difficulty: 1,
    equipment: ["Гантели", "Коврик"],
    tags: ["Ноги", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 2,
    title: "Бег на месте",
    description: "Кардио упражнение для разминки.",
    difficulty: 1,
    equipment: [],
    tags: ["Кардио"],
    video: "",
    images: [],
  },
  {
    id: 3,
    title: "Прыжки",
    description: "Упражнение для ног и ягодиц.",
    difficulty: 2,
    equipment: ["Скакалка"],
    tags: ["Ноги", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 4,
    title: "Ходьба",
    description: "Кардио упражнение для разминки.",
    difficulty: 1,
    equipment: [],
    tags: ["Кардио"],
    video: "",
    images: [],
  },
  {
    id: 5,
    title: "5x30",
    description: "Упражнение для ног и ягодиц.",
    difficulty: 1,
    equipment: ["Гантели", "Коврик"],
    tags: ["Ноги", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 6,
    title: "Пресс",
    description: "Пресс-упражнение для ног и ягодиц.",
    difficulty: 1,
    equipment: ["Гантели", "Коврик"],
    tags: ["Ноги", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 7,
    title: "Отжимания",
    description: "Упражнение для укрепления груди, плеч и трицепсов.",
    difficulty: 2,
    equipment: [],
    tags: ["Верх тела", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 8,
    title: "Планка",
    description: "Упражнение для укрепления кора и мышц стабилизаторов.",
    difficulty: 2,
    equipment: ["Коврик"],
    tags: ["Кор", "Стабилизация"],
    video: "",
    images: [],
  },
  {
    id: 9,
    title: "Выпады",
    description: "Упражнение для ног и ягодиц с акцентом на баланс.",
    difficulty: 2,
    equipment: ["Гантели"],
    tags: ["Ноги", "Ягодицы", "Баланс"],
    video: "",
    images: [],
  },
  {
    id: 10,
    title: "Берпи",
    description: "Кардио упражнение для всего тела.",
    difficulty: 2,
    equipment: [],
    tags: ["Кардио", "Все тело"],
    video: "",
    images: [],
  },
  {
    id: 11,
    title: "Подтягивания",
    description: "Упражнение для укрепления спины и бицепсов.",
    difficulty: 2,
    equipment: ["Турник"],
    tags: ["Верх тела", "Силовая"],
    video: "",
    images: [],
  },
  {
    id: 12,
    title: "Скручивания",
    description: "Упражнение для укрепления мышц пресса.",
    difficulty: 1,
    equipment: ["Коврик"],
    tags: ["Кор", "Пресс"],
    video: "",
    images: [],
  },
]

export const defaultPlayerData = {
  score: 0,
  height: 0,
  weight: 0,
}

export const defaultTrainings = [
  {
    id: 341545,
    title: "Тренировка 1",
    exercises: [
      {
        id: 1,
        exerciseId: 1,
        mode: "Время",
        value: "10:00",
      },
      {
        id: 2,
        exerciseId: 2,
        mode: "Количество повторов",
        value: 10,
      },
      {
        id: 3,
        exerciseId: 3,
        mode: "Цель",
        value: "Повышение силы",
      }
    ],
  },
  {
    id: 341546,
    title: "Тренировка 2",
    exercises: [
      {
        id: 3,
        exerciseId: 4,
        mode: "Время",
        value: "10:00",
      },
      {
        id: 2,
        exerciseId: 5,
        mode: "Количество повторов",
        value: 10,
      },
      {
        id: 2,
        exerciseId: 6,
        mode: "Цель",
        value: "Повышение силы",
      }
    ],
  },
  {
    id: 341547,
    title: "Тренировка 3",
    exercises: [
      {
        id: 1,
        exerciseId: 7,
        mode: "Время",
        value: "10:00",
      },
      {
        id: 1,
        exerciseId: 8,
        mode: "Количество повторов",
        value: 10,
      },
      {
        id: 1,
        exerciseId: 9,
        mode: "Цель",
        value: "Повышение силы",    
      }    
    ],
  }
]

export const difficultyTexts = ["Легко", "Средне", "Сложно"]
export const difficultyColors = ["green", "yellow", "pink"]