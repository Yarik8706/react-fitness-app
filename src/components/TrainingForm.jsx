import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, Button, Select, Card, Row, Col, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function TrainingForm() {
  const [workoutName, setWorkoutName] = useState(""); // Название тренировки
  const [exercises, setExercises] = useState([]); // Список упражнений

  // Опции для выбора упражнений
  const exerciseOptions = ["Приседания", "Отжимания", "Бег", "Планка"];

  // Опции для выбора режима упражнения
  const modeOptions = ["Время", "Цель", "Количество повторов"];

  // Добавление нового упражнения
  const addExercise = () => {
    const newExercise = {
      id: `exercise-${exercises.length + 1}`,
      exercise: "",
      mode: "",
      value: "",
    };
    setExercises([...exercises, newExercise]);
  };

  // Удаление упражнения
  const deleteExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  // Обновление данных упражнения
  const updateExercise = (id, field, value) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  // Обработка перетаскивания
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExercises(items);
  };

  // Сохранение тренировки
  const saveWorkout = () => {
    console.log("Тренировка сохранена:", { workoutName, exercises });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Название тренировки */}
      <Input
        placeholder="Название тренировки"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Кнопка добавления упражнения */}
      <Button type="primary" onClick={addExercise} style={{ marginBottom: "20px" }}>
        Добавить упражнение
      </Button>

      {/* Список упражнений */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="exercises">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {exercises.map((ex, index) => (
                <Draggable key={ex.id} draggableId={ex.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ marginBottom: "10px" }}
                    >
                      <Card
                        title={`Упражнение ${index + 1}`}
                        extra={
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => deleteExercise(ex.id)}
                          />
                        }
                      >
                        <Form layout="vertical">
                          <Row gutter={16}>
                            {/* Выбор упражнения */}
                            <Col span={8}>
                              <Form.Item label="Упражнение">
                                <Select
                                  placeholder="Выберите упражнение"
                                  value={ex.exercise}
                                  onChange={(value) =>
                                    updateExercise(ex.id, "exercise", value)
                                  }
                                >
                                  {exerciseOptions.map((option) => (
                                    <Option key={option} value={option}>
                                      {option}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            {/* Выбор режима */}
                            <Col span={8}>
                              <Form.Item label="Режим">
                                <Select
                                  placeholder="Выберите режим"
                                  value={ex.mode}
                                  onChange={(value) =>
                                    updateExercise(ex.id, "mode", value)
                                  }
                                >
                                  {modeOptions.map((option) => (
                                    <Option key={option} value={option}>
                                      {option}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            {/* Поле ввода в зависимости от режима */}
                            <Col span={8}>
                              {ex.mode === "Время" && (
                                <Form.Item label="Время (минуты:секунды)">
                                  <Input
                                    placeholder="00:00"
                                    value={ex.value}
                                    onChange={(e) =>
                                      updateExercise(ex.id, "value", e.target.value)
                                    }
                                  />
                                </Form.Item>
                              )}
                              {ex.mode === "Количество повторов" && (
                                <Form.Item label="Количество повторов">
                                  <Input
                                    type="number"
                                    placeholder="Введите число"
                                    value={ex.value}
                                    onChange={(e) =>
                                      updateExercise(ex.id, "value", e.target.value)
                                    }
                                  />
                                </Form.Item>
                              )}
                              {ex.mode === "Цель" && (
                                <Form.Item label="Цель">
                                  <Input
                                    placeholder="Введите цель"
                                    value={ex.value}
                                    onChange={(e) =>
                                      updateExercise(ex.id, "value", e.target.value)
                                    }
                                  />
                                </Form.Item>
                              )}
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Кнопка сохранения */}
      <Button type="primary" onClick={saveWorkout} style={{ marginTop: "20px" }}>
        Сохранить тренировку
      </Button>
    </div>
  );
}