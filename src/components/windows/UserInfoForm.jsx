import React from "react";
import { Modal, Form, Input, Button, message } from "antd";

export default function UserInfoForm ({ visible, onClose, onSubmit }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
        onClose();
      })
      .catch(() => {
        message.error("Пожалуйста, заполните все поля корректно.");
      });
  };

  return (
    <Modal
      title="Введите ваш вес и рост"
      open={visible}
      closable={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Подтвердить
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="weight"
          label="Вес (кг)"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш вес" },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: "Введите корректный вес (например, 70 или 70.5)",
            },
          ]}
        >
          <Input placeholder="Введите ваш вес" />
        </Form.Item>
        <Form.Item
          name="height"
          label="Рост (см)"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш рост" },
            {
              pattern: /^\d+$/,
              message: "Введите корректный рост (например, 175)",
            },
          ]}
        >
          <Input placeholder="Введите ваш рост" />
        </Form.Item>
      </Form>
    </Modal>
  );
};