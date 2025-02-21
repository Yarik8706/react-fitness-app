import {Modal} from "antd";


export default function RemoveSomethingModal({ visible, onAction, text }) {
  return (
    <Modal
      title={text}
      open={visible}
      onOk={() => onAction(true)}
      onCancel={() => onAction(false)}
      cancelText="Нет"
      okText="Да"
    ></Modal>
  )
} 