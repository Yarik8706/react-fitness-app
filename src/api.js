

export function getExercises() {
  return JSON.parse(localStorage.getItem("exercises") || "[]");
}

export function saveExercises(exercises) {
  localStorage.setItem("exercises", JSON.stringify(exercises));
} 