import {Button, Layout, Typography} from "antd";
import {Link} from "react-router-dom";


export default function PagesNav() {
  
  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography.Title level={2} style={{paddingBottom: "12px"}}>Фитнес-тренер</Typography.Title>
      <div style={{display: "flex", gap: "16px"}}>
        <Link to="/exercises-catalog">
          <Button type="primary">Каталог упражнений</Button>
        </Link>
        <Link to="/training-constructor">
          <Button type="primary">Конструктор тренировок</Button>
        </Link>
        <Link to="/start-training">
          <Button type="primary">Режим тренировки</Button>
        </Link>
        <Link to="/avatar">
          <Button type="primary">Аватар</Button>
        </Link>
      </div>
    </Layout.Header>
  )
} 