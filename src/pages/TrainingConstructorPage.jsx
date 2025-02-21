import {Button, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TrainingTable from "../components/TrainingTable.jsx";
import {useTrainings} from "../contexts/TrainingsContext.jsx";

export default function TrainingConstructorPage() {
  const {setTrainingFormState} = useTrainings();
  
  return (
    <>
      <Typography.Title level={2} style={{textAlign: "center"}}>Конструктор тренировок</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() =>
          setTrainingFormState({visible: true, isEdit: false})}>
          Добавить тренировку
        </Button>
      </Row>
      <Row>
        <TrainingTable />
      </Row>
    </>
  )
} 