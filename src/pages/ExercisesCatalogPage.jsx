﻿import { useState } from "react";
import {Button, Row, Modal, Typography} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import ExercisesForm from "../components/windows/ExercisesForm.jsx";
import {useExercises} from "../contexts/ExercisesContext.jsx";

export default function ExercisesCatalogPage(){
  const {exercises, handleAddExercise, handleEditExercise, handleDeleteExercise, handleOpenExerciseInfoModal} = useExercises();

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
          onDelete={handleDeleteExercise}
          onOpen={handleOpenExerciseInfoModal}
        />
      </Row>
    </>
  );
};