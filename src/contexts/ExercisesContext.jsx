import {createContext, useContext, useEffect, useState} from "react";
import {getExercises, saveExercises} from "../api.js";
import ExerciseInfoModal from "../components/windows/ExerciseInfoModal.jsx";
import ExercisesForm from "../components/windows/ExercisesForm.jsx";
import {Modal} from "antd";
import {getUniqueStrings, joinArraysOfObject} from "../utils.js";


const ExercisesContext = createContext({
  exercises: [],
  allUniqueTags: [],
  allUniqueEquipment: [],
  changeExercises: () => {},
  handleAddExercise: () => {},
  handleEditExercise: () => {},
  handleDeleteExercise: () => {},
  handleSaveExercise: () => {},
  handleOpenExerciseInfoModal: () => {},
})

export function ExercisesContextProvider({children}) {
  const [exercises, setExercises] = useState([]);
  const [exerciseInfoModalState, setExerciseInfoModalState] = useState({
    visible: false,
    exercise: null,
  });
  const [exerciseFormState, setExerciseFormState] = useState({
    visible: false,
    exercise: null,
    isEdit: false
  })
  const [allUniqueTags, setAllUniqueTags] = useState([]);
  const [allUniqueEquipment, setAllUniqueEquipment] = useState([]);
  
  useEffect(() => {
    const storedExercises = getExercises();
    setExercises(storedExercises);
  }, []);
  
  useEffect(() => {
    setAllUniqueEquipment(getUniqueStrings(joinArraysOfObject(exercises, "equipment")));
    setAllUniqueTags(getUniqueStrings(joinArraysOfObject(exercises, "tags")));
  }, [exercises]);
  
  function changeExercises(newExercises)  {
    saveExercises(newExercises);
    setExercises(newExercises);
  }

  const handleAddExercise = () => {
    setExerciseFormState({visible: true, exercise: null, isEdit: false});
  };

  const handleEditExercise = (id) => {
    const exercise = exercises.find((ex) => ex.id === id);
    setExerciseFormState({visible: true, exercise, isEdit: true});
  };

  const handleDeleteExercise = (id) => {
    changeExercises(exercises.filter((ex) => ex.id !== id));
  };

  function handleSaveExercise (values) {
    if (exerciseFormState.exercise) {
      changeExercises(
        exercises.map((ex) => (ex.id === exerciseFormState.exercise.id ? { ...ex, ...values } : ex))
      );
    } else {
      changeExercises([...exercises, { id: Date.now(), ...values }]);
    }
    setExerciseFormState({visible: false, exercise: null, isEdit: false});
  }
  
  function handleOpenExerciseInfoModal(id) {
    const exercise = exercises.find((ex) => ex.id === id);
    setExerciseInfoModalState({visible: true, exercise});
  }

  function onCloseExerciseInfoModal() {
    setExerciseInfoModalState({visible:false, exercise: null})
  }

  return (
    <ExercisesContext.Provider value={{
      exercises, changeExercises, setExerciseInfoModalState, 
      handleAddExercise, handleEditExercise, handleDeleteExercise,
      handleSaveExercise, handleOpenExerciseInfoModal,
      allUniqueTags, allUniqueEquipment
    }}>
      {children}
      <ExerciseInfoModal visible={exerciseInfoModalState.visible} 
                         onClose={onCloseExerciseInfoModal} 
                         exercise={exerciseInfoModalState.exercise}/>
      <Modal
        title={exerciseFormState.exercise ? "Редактировать упражнение" : "Добавить упражнение"}
        open={exerciseFormState.visible}
        onCancel={() => setExerciseFormState(prevState => 
          ({...prevState, visible: false}))}
        footer={null}
        destroyOnClose={true}
        width={"80%"}
      >
        <ExercisesForm currentExercise={exerciseFormState.exercise} onSubmit={handleSaveExercise} />
      </Modal>
    </ExercisesContext.Provider>
  )
} 

export default ExercisesContext

export function useExercises(){
  return useContext(ExercisesContext)
}