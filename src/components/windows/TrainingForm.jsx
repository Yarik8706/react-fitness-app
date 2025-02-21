import React, { useEffect, useState } from "react";
import { Input, Button, Select, Row, Col, Form, Collapse, Drawer, TimePicker } from "antd";
import { DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { useExercises } from "../../contexts/ExercisesContext.jsx";
import dayjs from "dayjs";
import { useAppContext } from "../../contexts/AppContext.jsx";

const { Option } = Select;

export default function TrainingForm({ trainingFormState, setTrainingFormState, onSave }) {
  const { allUniqueTags, allUniqueEquipment, exercises } = useExercises();
  const [workoutName, setWorkoutName] = useState("");
  const [trainingExercises, setTrainingExercises] = useState([]);
  const modeOptions = ["Время", "Цель", "Количество повторов"];
  const { trainingGoal, isMobile } = useAppContext();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (trainingFormState.training) {
      setWorkoutName(trainingFormState.training.title);
      setTrainingExercises(
        trainingFormState.training.exercises.map((ex) => ({
          ...ex,
          id: String(ex.id),
        }))
      );
    } else{
      setWorkoutName("");
      setTrainingExercises([]);
      setMessage("")
    }
  }, [trainingFormState]);

  function selectExerciseUsingTags(id, tags) {
    if (tags.length === 0) {
      updateExercise(id, "exerciseId", "");
      return;
    }
    const currentExercises = exercises.filter((ex) => {
      let exTags = [...ex.tags, ...ex.equipment];
      return tags.every((tag) => exTags.includes(tag));
    });

    if (currentExercises.length > 0) {
      const exercise = currentExercises[0];
      const exerciseId = exercise.id;
      updateExercise(id, "exerciseId", exerciseId);
    } else {
      updateExercise(id, "exerciseId", "");
    }
  }

  function getExerciseTitle(index, ex) {
    let title = exercises.find((e) => e.id === ex.exerciseId)?.title;
    if (title !== undefined) {
      return title;
    } else {
      return `Упражнение ${index + 1}`;
    }
  }

  const addExercise = () => {
    const newExercise = {
      id: `exercise-${trainingExercises.length + 1}`,
      exerciseId: "",
      mode: "",
      value: "",
    };
    setTrainingExercises([...trainingExercises, newExercise]);
  };

  const deleteExercise = (id) => {
    setTrainingExercises(trainingExercises.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id, field, value) => {
    setTrainingExercises(
      trainingExercises.map((ex) =>
        ex.id === id
          ? {
            ...ex,
            [field]: value,
            value:
              field === "mode" && value === "Цель" && ex.value === ""
                ? trainingGoal.goal
                : field === "value"
                  ? value
                  : ex.value,
          }
          : ex
      )
    );
  };

  const moveExerciseUp = (index) => {
    if (index === 0) return; // Нельзя переместить вверх первый элемент
    const newExercises = [...trainingExercises];
    const temp = newExercises[index];
    newExercises[index] = newExercises[index - 1];
    newExercises[index - 1] = temp;
    setTrainingExercises(newExercises);
  };

  const moveExerciseDown = (index) => {
    if (index === trainingExercises.length - 1) return; // Нельзя переместить вниз последний элемент
    const newExercises = [...trainingExercises];
    const temp = newExercises[index];
    newExercises[index] = newExercises[index + 1];
    newExercises[index + 1] = temp;
    setTrainingExercises(newExercises);
  };

  const saveWorkout = () => {
    for (const ex of trainingExercises) {
      if (ex.exerciseId === "") {
        setMessage("Некоторые упражнения не выбраны");
        return;
      }
    }
    if (workoutName.trim() === "") {
      setMessage("Введите название тренировки");
      return;
    }
    const training = {
      title: workoutName,
      id: trainingFormState.training ? trainingFormState.training.id : Date.now(),
      exercises: trainingExercises,
    };
    onSave(training);
    setTrainingFormState({ visible: false, training: null, isEdit: false });
    setWorkoutName("");
    setTrainingExercises([]);
  };
  
  const getExtra = (index, ex) => {
    return (
      <div>
        <Button
          type="text"
          icon={<UpOutlined/>}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем сворачивание/разворачивание Collapse
            moveExerciseUp(index);
          }}
          disabled={index === 0} // Отключаем кнопку, если это первый элемент
        />
        <Button
          type="text"
          icon={<DownOutlined/>}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем сворачивание/разворачивание Collapse
            moveExerciseDown(index);
          }}
          disabled={index === trainingExercises.length - 1} // Отключаем кнопку, если это последний элемент
        />
        <Button
          type="text"
          icon={<DeleteOutlined/>}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем сворачивание/разворачивание Collapse
            deleteExercise(ex.id);
          }}
        />
      </div>
    )
  }

  return (
    <Drawer
      open={trainingFormState.visible}
      placement="right"
      width={isMobile ? "100%" : "80%"}
      onClose={() => {
        setTrainingFormState({visible: false, training: null, isEdit: false});
      }}
      destroyOnClose
      title={trainingFormState.isEdit ? "Редактирование тренировки" : "Создание тренировки"}
    >
      <div style={{padding: "20px"}} className="training-form">
        <Input
          placeholder="Название тренировки"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          style={{marginBottom: "20px"}}
        />

        <Button type="primary" onClick={addExercise} style={{marginBottom: "20px"}}>
          Добавить упражнение
        </Button>

        <div style={{width: "100%"}}>
          {trainingExercises.map((ex, index) => (
            <div key={ex.id+index} style={{marginBottom: "10px"}}>
              <Collapse
                defaultActiveKey={["1"]}
                title={`Упражнение ${index + 1}`}
                items={[
                  {
                    key: "1",
                    extra: getExtra(index, ex),
                    label: getExerciseTitle(index, ex),
                    children: (
                      <Form layout="vertical">
                      {isMobile ? (
                          <>
                            <Form.Item label="Упражнение">
                              <Select
                                showSearch
                                value={exercises.find((e) => e.id === ex.exerciseId)?.title}
                                onChange={(value) => updateExercise(ex.id, "exerciseId", value)}
                                placeholder="Выберите упражнение"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                                }
                                options={exercises.map(({ title, id }) => ({
                                  value: id,
                                  label: title,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item label={<span>Теги для автовыбора упражнения</span>}>
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
                                  },
                                ]}
                              />
                            </Form.Item>
                            <Form.Item label="Режим">
                              <Select
                                placeholder="Выберите режим"
                                value={ex.mode}
                                onChange={(value) => updateExercise(ex.id, "mode", value)}
                              >
                                {modeOptions.map((option) => (
                                  <Option key={option} value={option}>
                                    {option}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {ex.mode === "Время" && (
                              <Form.Item label="Время (минуты:секунды)">
                                <TimePicker
                                  defaultValue={dayjs("5:00", "mm:ss")}
                                  format="mm:ss"
                                  onChange={(date) => {
                                    updateExercise(ex.id, "value", date.format("mm:ss"));
                                  }}
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
                          </>
                        ) : (
                          <Row gutter={8}>
                            <Col span={6}>
                              <Form.Item label="Упражнение">
                                <Select
                                  showSearch
                                  value={exercises.find((e) => e.id === ex.exerciseId)?.title}
                                  onChange={(value) => updateExercise(ex.id, "exerciseId", value)}
                                  placeholder="Выберите упражнение"
                                  optionFilterProp="label"
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                                  }
                                  options={exercises.map(({ title, id }) => ({
                                    value: id,
                                    label: title,
                                  }))}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item label={<span>Теги для автовыбора упражнения</span>}>
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
                                    },
                                  ]}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item label="Режим">
                                <Select
                                  placeholder="Выберите режим"
                                  value={ex.mode}
                                  onChange={(value) => updateExercise(ex.id, "mode", value)}
                                >
                                  {modeOptions.map((option) => (
                                    <Option key={option} value={option}>
                                      {option}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              {ex.mode === "Время" && (
                                <Form.Item label="Время (минуты:секунды)">
                                  <TimePicker
                                    defaultValue={dayjs("5:00", "mm:ss")}
                                    format="mm:ss"
                                    onChange={(date) => {
                                      updateExercise(ex.id, "value", date.format("mm:ss"));
                                    }}
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
                        )}
                      </Form>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </div>

        {message && <p style={{color: "red"}}>{message}</p>}
        <Button type="primary" onClick={saveWorkout} style={{ marginTop: "20px" }}>
          Сохранить тренировку
        </Button>
      </div>
    </Drawer>
  );
}
