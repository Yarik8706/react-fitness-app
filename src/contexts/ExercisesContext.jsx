import {createContext, useContext, useEffect, useState} from "react";
import {getExercises, saveExercises} from "../api.js";


const ExercisesContext = createContext({
  exercises: [],
  changeExercises: () => {}
})

export function ExercisesContextProvider({children}) {
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    const storedExercises = getExercises();
    console.log("Stored Exercises:", storedExercises);
    setExercises(storedExercises);
  }, []);
  
  function changeExercises(newExercises)  {
    saveExercises(newExercises);
    setExercises(newExercises);
  }

  return (
    <ExercisesContext.Provider value={{exercises, changeExercises}}>
      {children}
    </ExercisesContext.Provider>
  )
} 

export default ExercisesContext

export function useExercises(){
  return useContext(ExercisesContext)
}