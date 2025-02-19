import { useState } from "react";
import {Button, Row, Modal, Typography} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import ExercisesForm from "../components/ExercisesForm.jsx";
import {useExercises} from "../contexts/ExercisesContext.jsx";

export default function ExercisesCatalogPage(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const {exercises, changeExercises} = useExercises();
  
  const handleAddExercise = () => {
    setIsModalVisible(true);
    setCurrentExercise(null);
  };

  const handleEditExercise = (id) => {
    const exercise = exercises.find((ex) => ex.id === id);
    setIsModalVisible(true);
    setCurrentExercise(exercise);
  };

  const handleDeleteExercise = (id) => {
    changeExercises(exercises.filter((ex) => ex.id !== id));
  };

  const handleSaveExercise = (values) => {
    console.log(values);
    if (currentExercise) {
      changeExercises(
        exercises.map((ex) => (ex.id === currentExercise.id ? { ...ex, ...values } : ex))
      );
    } else {
      changeExercises([...exercises, { id: Date.now(), ...values }]);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <Typography.Title level={2} style={{textAlign: "center"}}>Каталог упражнений</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddExercise}>
          Добавить упражнение
        </Button>
      </Row>
      <Row>
        <ExercisesCatalogTable exercises={exercises} onEdit={handleEditExercise} onDelete={handleDeleteExercise}/>
      </Row>
      
      <Modal
        title={currentExercise ? "Редактировать упражнение" : "Добавить упражнение"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
        width={"80%"}
      >
        <ExercisesForm currentExercise={currentExercise} onSubmit={handleSaveExercise} />
      </Modal>
    </>
  );
};