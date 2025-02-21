import {createContext, useContext, useEffect, useState} from "react";
import {getTrainings, saveTrainings} from "../api.js";
import TrainingForm from "../components/windows/TrainingForm.jsx";
import TrainingInfoModal from "../components/windows/TrainingInfoModal.jsx";


const TrainingsContext = createContext({
  trainings: [],
  setTrainingInfoModalState: () => {},
  setTrainingFormState: () => {},
  changeTrainings: () => {},
})

export function TrainingsContextProvider({children}){
  const [trainings, setTrainings] = useState([]);
  const [trainingInfoModalState, setTrainingInfoModalState] 
    = useState({visible: false, 
    training: null,});

  const [trainingFormState, setTrainingFormState] = useState({
    visible: false,
    training: null,
    isEdit: false
  })
  
  useEffect(() => {
    const storedTrainings = getTrainings();
    setTrainings(storedTrainings);
  }, []);
  
  function changeTrainings(newTrainings){
    saveTrainings(newTrainings);
    setTrainings(newTrainings);
  }
  
  function saveTraining(training) {
    const newTrainings = [...trainings];
    const index = newTrainings.findIndex((t) => t.id === training.id);
    if (index !== -1) {
      newTrainings[index] = training;
    } else {
      newTrainings.push(training);
    }
    changeTrainings(newTrainings);
  }
  
  return <TrainingsContext.Provider value={{
    trainings, changeTrainings, 
    setTrainingInfoModalState, 
    setTrainingFormState}}
  >{children}
    <TrainingForm 
      setTrainingFormState={setTrainingFormState} 
      trainingFormState={trainingFormState}
      training={trainingFormState.training}
      onSave={saveTraining}
      className="modal-window"
    />
    <TrainingInfoModal
      className="modal-window"
      trainingInfoState={trainingInfoModalState}
      onClose={() => setTrainingInfoModalState({visible: false, training: null})} 
    />
  </TrainingsContext.Provider>
}

export default TrainingsContext

export function useTrainings() {
  return useContext(TrainingsContext);
} 
