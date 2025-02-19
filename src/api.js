import {defaultExercises} from "./constants.js";

export function getExercises() {
  if (localStorage.getItem("exercises") === "[]" 
    || localStorage.getItem("exercises") === null) {
    saveExercises(defaultExercises);
  }
  return JSON.parse(localStorage.getItem("exercises") || "[]");
}

export function saveExercises(exercises) {
  localStorage.setItem("exercises", JSON.stringify(exercises));
} 