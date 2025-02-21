import {Col, List, Modal, Typography} from "antd";
import {useExercises} from "../../contexts/ExercisesContext.jsx";


export default function TrainingInfoModal({ trainingInfoState, onClose }) {
  const {exercises} = useExercises()
  
  if (!trainingInfoState || !trainingInfoState.training) return null;
  return (
    <Modal
      title={trainingInfoState.training.title}
      open={trainingInfoState.visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        dataSource={trainingInfoState.training.exercises}
        renderItem={(exercise) => (
          <List.Item>
            <Col>
              <Typography.Text strong>
                {exercises.find((e) => e.id === exercise.exerciseId)?.title 
                  || `Упражнение ${exercise.exerciseId}`}</Typography.Text>
              <Typography.Text> - {exercise.mode}: {exercise.value}</Typography.Text>
            </Col>
          </List.Item>
        )}
      />
    </Modal>
  )
}