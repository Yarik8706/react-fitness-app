﻿import {Button, Row, Typography} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import {useExercises} from "../contexts/ExercisesContext.jsx";

export default function ExercisesCatalogPage(){
  const {exercises, handleAddExercise, tryDeleteExercise, handleEditExercise, handleOpenExerciseInfoModal} = useExercises();

  return (
    <>
      <Typography.Title level={2} style={{textAlign: "center"}}>Каталог упражнений</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddExercise}>
          Добавить упражнение
        </Button>
      </Row>
      <Row>
        <ExercisesCatalogTable 
          exercises={exercises} 
          onEdit={handleEditExercise} 
          onDelete={tryDeleteExercise}
          onOpen={handleOpenExerciseInfoModal}
        />
      </Row>
    </>
  );
};