import {Button, Form, Input, Select} from "antd";
import ImagesUploader from "./ImagesUploader.jsx";
import VideoUploader from "./VideoUploader.jsx";


export default function ExercisesForm({ onSubmit, currentExercise={} }) {
  return (
    <Form
      initialValues={currentExercise || {}}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item name="title" label="Название" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="difficulty" label="Сложность" rules={[{ required: true }]}>
        <Select>
          <Option value={0}>Простое</Option>
          <Option value={1}>Среднее</Option>
          <Option value={2}>Сложное</Option>
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
      <Form.Item name="images" label="Изображения" >
        <ImagesUploader />
      </Form.Item>
      <Form.Item name="video" label="Видео">
        <VideoUploader />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  )
} 