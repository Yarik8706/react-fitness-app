import React, { useState, useEffect } from 'react';
import {Button, Card, Statistic, Row, Col, Modal, Typography} from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ForwardOutlined, BackwardOutlined } from '@ant-design/icons';
import StartTraining from "../components/StartTraining.jsx";
import TrainingTable from "../components/TrainingTable.jsx";

const { Countdown } = Statistic;

export default function StartTrainingPage() {
  const [playModeState, setPlayModeState] = useState(false);
  
  return <>
    {!playModeState && <>
      <Typography.Title level={2} style={{textAlign: "center", marginBottom: "16px"}}>Выберите тренировку</Typography.Title>
      <TrainingTable editModeState={false} onChangePlayMode={setPlayModeState}/>
    </>}
    {playModeState && <StartTraining />}
  </>
}