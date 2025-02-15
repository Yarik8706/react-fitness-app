import {createContext, useEffect, useState} from "react";
import {getExercises} from "../api.js";


const ExercisesContext = createContext({
  exercises: [],
  setExercises: () => {}
})

export function ExercisesProvider({children}) {
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    const storedExercises = getExercises();
    setExercises(storedExercises);
  }, []);

  return (
    <ExercisesContext.Provider value={{exercises, setExercises}}>
      {children}
    </ExercisesContext.Provider>
  )
} 

export default ExercisesContext