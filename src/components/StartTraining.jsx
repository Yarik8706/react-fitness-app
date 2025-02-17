import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Modal, Row, Statistic} from "antd";
import {BackwardOutlined, ForwardOutlined} from "@ant-design/icons";

const { Countdown } = Statistic;

export default function StartTraining() {
  const workout = {
    title: 'My Workout',
    exercises: [
      { exercise: 'Bench Press', mode: 'reps', value: '3' },
      { exercise: 'Squats', mode: 'purpose', value: 'ккккккккк' },
      { exercise: 'Deadlift', mode: 'reps', value: '5' },
      { exercise: 'Overhead Press', mode: 'time', value: '1:30' },
      { exercise: 'Lunge', mode: 'reps', value: '8' },
    ],
  }

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(30); // Базовое время отдыха
  const [workoutStats, setWorkoutStats] = useState({ totalTime: 0, totalReps: 0 });
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Оставшееся время для упражнения или отдыха
  const timerRef = useRef(null); // Ref для хранения таймера

  const currentExercise = workout.exercises[currentExerciseIndex];

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
    } else if (currentExercise.mode === 'time') {
      // Начало упражнения с таймером
      const exerciseTime = parseTime(currentExercise.value);
      setTimeLeft(exerciseTime / 1000); // Устанавливаем время упражнения в секундах
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current); // Останавливаем таймер
            handleNextExercise(); // Переходим к следующему упражнению
            return 0;
          }
          return prev - 1; // Уменьшаем время на 1 секунду
        });
      }, 1000);
    }

    // Очистка таймера при размонтировании
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isResting, currentExercise, restTime]);

  // Обработка завершения упражнения
  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setIsResting(true); // Начинаем отдых
      setRestTime(30); // Сбрасываем время отдыха до базовых 30 секунд
    } else {
      // Тренировка завершена
      setIsWorkoutFinished(true);
    }
  };

  // Обработка завершения отдыха
  const handleRestEnd = () => {
    setIsResting(false);
    setCurrentExerciseIndex(prev => prev + 1);
  };

  // Корректировка времени отдыха
  const adjustRestTime = (seconds) => {
    setRestTime(prev => {
      const newRestTime = prev + seconds;
      if (newRestTime <= 10) {
        handleRestEnd(); // Автоматически завершаем отдых, если время <= 10 секунд
        return 0;
      }
      return newRestTime;
    });
  };

  // Пропуск отдыха
  const skipRest = () => {
    handleRestEnd();
  };

  // Возврат к предыдущему упражнению
  const goBack = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  // Обновление статистики
  useEffect(() => {
    if (currentExercise.mode === 'time') {
      setWorkoutStats(prev => ({
        ...prev,
        totalTime: prev.totalTime + parseTime(currentExercise.value),
      }));
    } else if (currentExercise.mode === 'reps') {
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
    <Card title={workout.title} style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
      {isResting ? (
        <>
          <Statistic title="Rest Time" value={timeLeft} suffix="seconds" />
          <Button onClick={() => adjustRestTime(10)}>+10s</Button>
          <Button onClick={() => adjustRestTime(-10)}>-10s</Button>
          <Button onClick={skipRest} icon={<ForwardOutlined />}>Skip Rest</Button>
        </>
      ) : (
        <>
          <h2>{currentExercise.exercise}</h2>
          {currentExercise.mode === 'time' ? (
            <Statistic title="Time Left" value={timeLeft} suffix="seconds" />
          ) : currentExercise.mode === 'reps' ? (
            <Button onClick={handleNextExercise}>Done with Reps</Button>
          ) : (
            <p>{currentExercise.value}</p>
          )}
          <Button onClick={handleNextExercise} icon={<ForwardOutlined />}>Skip Exercise</Button>
          {currentExerciseIndex > 0 && (
            <Button onClick={goBack} icon={<BackwardOutlined />}>Go Back</Button>
          )}
        </>
      )}

      {/* Модальное окно с результатами тренировки */}
      <Modal
        title="Workout Finished"
        visible={isWorkoutFinished}
        onOk={() => setIsWorkoutFinished(false)}
        onCancel={() => setIsWorkoutFinished(false)}
        footer={[
          <Button key="close" onClick={() => setIsWorkoutFinished(false)}>
            Close
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Time (s)" value={workoutStats.totalTime / 1000} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Reps" value={workoutStats.totalReps} />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
} 