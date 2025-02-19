import {Modal} from "antd";


export default function RemoveExerciseModal({ onAction }) {
  return (
    <Modal
      title="Удалить упражнение"
      visible={true}
      onOk={() => onAction(true)}
      onCancel={() => onAction(false)}
    >
      <p>Вы действительно хотите удалить упражнение?</p>
    </Modal>
  )
} 