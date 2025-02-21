import React, { useState } from 'react';
import {Typography} from 'antd';
import StartTraining from "../components/StartTraining.jsx";
import TrainingTable from "../components/TrainingTable.jsx";
import {useTrainings} from "../contexts/TrainingsContext.jsx";

export default function StartTrainingPage() {
  const [playModeState, setPlayModeState] = useState(
    {isActive: false,
      id: 0
    });
  const {trainings} = useTrainings();
  
  return <>
    {!playModeState.isActive && <>
      <Typography.Title level={2} style={{textAlign: "center", marginBottom: "16px"}}>Выберите тренировку</Typography.Title>
      <TrainingTable editModeState={false} onChangePlayMode={setPlayModeState}/>
    </>}
    {playModeState.isActive && <StartTraining 
      workout={trainings.find(training => training.id === playModeState.id)}
      onClose={() => setPlayModeState({isActive: false, id: 0})}
    />}
  </>
}