import { useState } from "react";
import {Input, Button, Card, Row, Col, Select, Tag, Modal, Form, Typography} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import ImagesUploader from "../components/ImagesUploader.jsx";

const { Option } = Select;

export default function ExercisesCatalogPage(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exercises, setExercises] = useState([
    // Пример предзаполненных упражнений
    {
      id: 1,
      name: "Приседания",
      description: "Упражнение для ног и ягодиц.",
      difficulty: "Среднее",
      equipment: ["Гантели", "Коврик"],
      tags: ["Ноги", "Силовая"],
    },
    {
      id: 2,
      name: "Бег на месте",
      description: "Кардио упражнение для разминки.",
      difficulty: "Простое",
      equipment: [],
      tags: ["Кардио"],
    },
  ]);

  // Функции для работы с упражнениями
  const handleAddExercise = () => {
    setIsModalVisible(true);
    setCurrentExercise(null);
  };

  const handleEditExercise = (exercise) => {
    setIsModalVisible(true);
    setCurrentExercise(exercise);
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const handleSaveExercise = (values) => {
    if (currentExercise) {
      // Редактирование существующего упражнения
      setExercises(
        exercises.map((ex) => (ex.id === currentExercise.id ? { ...ex, ...values } : ex))
      );
    } else {
      // Добавление нового упражнения
      setExercises([...exercises, { id: Date.now(), ...values }]);
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "24px", width: "80%", margin: "0 auto" }}>
      {/* Заголовок и кнопка добавления */}
      <Typography.Title level={2} style={{textAlign: "center"}}>Каталог упражнений</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddExercise}>
          Добавить упражнение
        </Button>
      </Row>
      <Row>
        <ExercisesCatalogTable />
      </Row>
      
      <Modal
        title={currentExercise ? "Редактировать упражнение" : "Добавить упражнение"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentExercise || {}}
          onFinish={handleSaveExercise}
          layout="vertical"
        >
          <Form.Item name="name" label="Название" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="difficulty" label="Сложность" rules={[{ required: true }]}>
            <Select>
              <Option value="Простое">Простое</Option>
              <Option value="Среднее">Среднее</Option>
              <Option value="Сложное">Сложное</Option>
            </Select>
          </Form.Item>
          <Form.Item name="equipment" label="Оборудование">
            <Select mode="tags" placeholder="Выберите оборудование">
              <Option value="Гантели">Гантели</Option>
              <Option value="Коврик">Коврик</Option>
              <Option value="Скакалка">Скакалка</Option>
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Теги">
            <Select mode="tags" placeholder="Добавьте теги">
              <Option value="Ноги">Ноги</Option>
              <Option value="Кардио">Кардио</Option>
              <Option value="Силовая">Силовая</Option>
            </Select>
          </Form.Item>
          <Form.Item name="images" label="Изображения">
            <ImagesUploader onImagesUpload={(base64) => console.log("Base64:", base64)} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      </Modal>
    </div>
  );
};