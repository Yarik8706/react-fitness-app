import {defaultExercises, defaultPlayerData, defaultTrainings} from "./constants.js";

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

export function getTrainings(){
  if (localStorage.getItem("trainings") === "[]" 
    || localStorage.getItem("trainings") === null) {
    saveTrainings(defaultTrainings);
  }
  return JSON.parse(localStorage.getItem("trainings") || "[]");
}

export function saveTrainings(trainings){
  localStorage.setItem("trainings", JSON.stringify(trainings));
}

export function getPlayerData(){
  if (localStorage.getItem("playerData") === "[]" 
    || localStorage.getItem("playerData") === null) {
    savePlayerData(defaultPlayerData);
  }
  return JSON.parse(localStorage.getItem("playerData") || "[]");
}

export function savePlayerData(playerData){
  localStorage.setItem("playerData", JSON.stringify(playerData));
}