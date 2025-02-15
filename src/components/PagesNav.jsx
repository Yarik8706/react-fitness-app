import {Header} from "antd/es/layout/layout.js";
import {Button, Menu, Typography} from "antd";


export default function PagesNav() {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography.Title level={2} style={{paddingBottom: "12px"}}>Фитнес-тренер</Typography.Title>
      <div style={{display: "flex", gap: "16px"}}>
        <Button type="primary">Создать тренировку</Button>
        <Button type="primary">Каталог упражнений</Button>
        <Button type="primary">Режим тренировки</Button>
        <Button type="primary">Аватар</Button>
      </div>
    </Header>
  )
} 