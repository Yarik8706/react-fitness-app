import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Modal, Row, Statistic, Tag, Typography} from "antd";
import {BackwardOutlined, ForwardOutlined} from "@ant-design/icons";
import {useExercises} from "../contexts/ExercisesContext.jsx";
import PlayModeExerciseInfo from "./PlayModeExerciseInfo.jsx";
import {useAppContext} from "../contexts/AppContext.jsx";

export default function StartTraining({workout, onClose}) {
  const {exercises} = useExercises();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(30); // Базовое время отдыха
  const [workoutStats, setWorkoutStats] = useState({ totalTime: 0, totalReps: 0 });
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Оставшееся время для упражнения или отдыха
  const timerRef = useRef(null); 
  const {playerData, editPlayerData} = useAppContext();

  const currentExercise = workout.exercises[currentExerciseIndex];
  const [playerScore, setPlayerScore] = useState(0);
  
  useEffect(() => {
    
    if (isWorkoutFinished) {
      setPlayerScore(Math.round(workoutStats.totalReps * 10 * workout.exercises.length * Math.random()));
    }
  }, [isWorkoutFinished]);
  
  // Запуск таймера для упражнения или отдыха
  useEffect(() => {
    
    if (isResting) {
      // Начало отдыха
      setTimeLeft(restTime); // Устанавливаем время отдыха
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current); // Останавливаем таймер
            handleRestEnd(); // Завершаем отдых
            return 0;
          }
          return prev - 1; // Уменьшаем время на 1 секунду
        });
      }, 1000);
    } else if (currentExercise.mode === 'Время') {
      // Начало упражнения с таймером
      const exerciseTime = parseTime(currentExercise.value);
      setTimeLeft(exerciseTime / 1000); // Устанавливаем время упражнения в секундах
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current); // Останавливаем таймер
            handleNextExercise(); 
            return 0;
          }
          return prev - 1; 
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isResting, currentExercise, restTime]);

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setIsResting(true); // Начинаем отдых
      setRestTime(30); // Сбрасываем время отдыха до базовых 30 секунд
    } else {
      // Тренировка завершена
      setIsWorkoutFinished(true);
    }
  };

  const handleRestEnd = () => {
    setIsResting(false);
    setCurrentExerciseIndex(prev => prev + 1);
  };

  const adjustRestTime = (seconds) => {
    setRestTime(prev => {
      const newRestTime = prev + seconds;
      if (newRestTime <= 0) {
        handleRestEnd(); // Автоматически завершаем отдых, если время <= 10 секунд
        return 0;
      }
      return newRestTime;
    });
  };

  const skipRest = () => {
    handleRestEnd();
  };
  
  const closeResultModal = () => {
    setIsWorkoutFinished(false);
    editPlayerData({...playerData, score: playerScore});
    onClose();
  };

  const goBack = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (currentExercise.mode === 'Время') {
      setWorkoutStats(prev => ({
        ...prev,
        totalTime: prev.totalTime + parseTime(currentExercise.value),
      }));
    } else if (currentExercise.mode === 'Количество повторов') {
      setWorkoutStats(prev => ({
        ...prev,
        totalReps: prev.totalReps + parseInt(currentExercise.value, 10),
      }));
    }
  }, [currentExercise]);

  // Преобразование строки времени в миллисекунды
  const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60 + seconds) * 1000;
  };

  return (
    <Card title={workout.title} style={{width: '100%', maxWidth: '500px', margin: 'auto' }}>
      {!isResting && <PlayModeExerciseInfo exercise={
        exercises.find((e) => e.id === workout.exercises[currentExerciseIndex].exerciseId)
      } />}
      {isResting ? (
        <>
          <Statistic title="Отдых" value={timeLeft} suffix="сек." />
          <Button onClick={() => adjustRestTime(10)}>+10 сек.</Button>
          <Button onClick={() => adjustRestTime(-10)}>-10 сек.</Button>
          <Button onClick={skipRest} icon={<ForwardOutlined />}>Пропустить отдых</Button>
        </>
      ) : (
        <>
          <h2>{currentExercise.exercise}</h2>
          {currentExercise.mode === 'Время' ? (
            <Statistic title="Времени осталось" value={timeLeft} suffix="сек." />
          ) : currentExercise.mode === 'Количество повторов' ? (
            <Button onClick={handleNextExercise}>Выполнено</Button>
          ) : (
            <p>Цель: {currentExercise.value}</p>
          )}
          <Button onClick={handleNextExercise} icon={<ForwardOutlined />}>Пропустить упражнение</Button>
          {currentExerciseIndex > 0 && (
            <Button onClick={goBack} icon={<BackwardOutlined />}>Вернуться назад</Button>
          )}
        </>
      )}

      {/* Модальное окно с результатами тренировки */}
      <Modal
        title="Тренировка закончилась"
        open={isWorkoutFinished}
        closable={false}
        footer={[
          <Button type="primary" key="close" onClick={closeResultModal}>
            Закрыть
          </Button>
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Общее время (c)" value={workoutStats.totalTime / 1000} />
          </Col>
          <Col span={12}>
            <Statistic title="Общее количество повторов" value={workoutStats.totalReps} />
          </Col>
          <Col span={12}>
            <Typography.Text>Баллов получено: <Tag color="green">{playerScore}</Tag></Typography.Text>
          </Col>
        </Row>
      </Modal>
    </Card>
  );
} 