﻿import CenterContainer from "../components/CenterContainer.jsx";
import {Button, Drawer, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ExercisesCatalogTable from "../components/ExercisesCatalogTable.jsx";
import TrainingTable from "../components/TrainingTable.jsx";
import TrainingFormDrawer from "../components/TrainingFormDrawer.jsx";
import {useState} from "react";


export default function TrainingConstructorPage() {
  const [drawerState, setDrawerState] = useState(true);
  
  return (
    <>
      <Typography.Title level={2} style={{textAlign: "center"}}>Конструктор тренировок</Typography.Title>
      <Row style={{marginBottom: "16px"}}>
        <Button type="primary" icon={<PlusOutlined />}>
          Добавить тренировку
        </Button>
      </Row>
      <Row>
        <TrainingTable />
      </Row>
      <Drawer open={drawerState} placement="right" width="80%" onClose={() => setDrawerState(false)}><TrainingFormDrawer/></Drawer>
    </>
  )
} 