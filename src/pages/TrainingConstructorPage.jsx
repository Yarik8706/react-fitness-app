import CenterContainer from "../components/CenterContainer.jsx";
import {Button, Drawer, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import TrainingTable from "../components/TrainingTable.jsx";
import TrainingFormDrawer from "../components/TrainingFormDrawer.jsx";


export default function TrainingConstructorPage() {
  return (
    <CenterContainer>
      <Typography.Title level={2} style={{textAlign: "center"}}>Конструктор тренировок</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />}>
          Добавить тренировку
        </Button>
      </Row>
      <Row>
        <TrainingTable />
      </Row>
      <Drawer open={true} placement="right" width="80%"><TrainingFormDrawer/></Drawer>
    </CenterContainer>
  )
} 