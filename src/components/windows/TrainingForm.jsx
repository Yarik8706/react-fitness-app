import React, {useEffect, useRef, useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, Button, Select, Card, Row, Col, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {useExercises} from "../../contexts/ExercisesContext.jsx";

const { Option } = Select;

export default function TrainingForm() {
  const { allUniqueTags, allUniqueEquipment, exercises} = useExercises();
  const [workoutName, setWorkoutName] = useState(""); // Название тренировки
  const [trainingExercises, setTrainingExercises] = useState([]); // Список упражнений
  
  const modeOptions = ["Время", "Цель", "Количество повторов"];
  console.log("trainingExercises", trainingExercises)
  function selectExerciseUsingTags(id, tags) {
    const currentExercises = exercises.filter((ex) => {
      console.log(tags)
      let exTags = [...ex.tags, ...ex.equipment];
      console.log(exTags)
      return tags.every((tag) => {
        console.log(tag)
        return exTags.includes(tag)});
    });
    console.log(currentExercises)

    if (currentExercises.length > 0) {
      const exercise = currentExercises[0];
      const exerciseId = exercise.id;
      console.log("dgsgfgs", exercise)
      updateExercise(id, "exerciseId", exerciseId);
    }
  }
    

  // Добавление нового упражнения
  const addExercise = () => {
    const newExercise = {
      id: `exercise-${trainingExercises.length + 1}`,
      exerciseId: "",
      mode: "",
      value: "",
    };
    setTrainingExercises([...trainingExercises, newExercise]);
  };

  // Удаление упражнения
  const deleteExercise = (id) => {
    setTrainingExercises(trainingExercises.filter((ex) => ex.id !== id));
  };

  // Обновление данных упражнения
  const updateExercise = (id, field, value) => {
    setTrainingExercises(
      trainingExercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  // Обработка перетаскивания
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(trainingExercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTrainingExercises(items);
  };

  // Сохранение тренировки
  const saveWorkout = () => {
    console.log("Тренировка сохранена:", { workoutName, exercises: trainingExercises });
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
              {trainingExercises.map((ex, index) => (
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
                          <Row gutter={8}>
                            {/* Выбор упражнения */}
                            <Col span={6}>
                              <Form.Item label="Упражнение">
                                <Select
                                  showSearch
                                  value={exercises.find((e) => e.id === ex.exerciseId)?.title}
                                  onChange={(value) =>
                                    updateExercise(ex.id, "exerciseId", value)
                                  }
                                  placeholder="Выберите упражнение"
                                  optionFilterProp="label"
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                  }
                                  options={
                                    exercises.map(({title, id}) => ({
                                      value: id,
                                      label: title,
                                    }))
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item
                                label={<span>Теги для автовыбора упражнения</span>}
                              >
                                <Select
                                  mode="tags"
                                  placeholder="Выберите теги"
                                  value={ex.tags}
                                  onChange={(value) => selectExerciseUsingTags(ex.id, value)}
                                  options={[
                                    {
                                      label: <span>Теги</span>,
                                      title: "Теги",
                                      options: allUniqueTags.map((tag) => ({
                                        value: tag,
                                        label: tag,
                                      })),
                                    },
                                    {
                                      label: <span>Оборудование</span>,
                                      title: "Оборудование",
                                      options: allUniqueEquipment.map((equipment) => ({
                                        value: equipment,
                                        label: equipment,
                                      })),
                                    }
                                  ]}
                                />
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