import {Button, Dropdown, Layout, Typography} from "antd";
import {Link} from "react-router-dom";
import {useAppContext} from "../../contexts/AppContext.jsx";

const items = [
  {
    key: '1',
    label: (
      <Link to="/exercises-catalog">
        <Button type="primary">Каталог упражнений</Button>
      </Link>
    ),
  },
  {
    key: '2',
    label: (
    <Link to="/training-constructor">
      <Button type="primary">Конструктор тренировок</Button>
    </Link>
    ),
  },
  {
    key: '3',
    label: (
    <Link to="/start-training">
      <Button type="primary">Режим тренировки</Button>
    </Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link to="/avatar">
        <Button type="primary">Аватар</Button>
      </Link>
    )
  }
];

export default function PagesNav() {
  const {isMobile} = useAppContext();
  
  return (
    <Layout.Header
      className="nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fafafa",
      }}
    >
      <Typography.Title className="nav-title" level={2} style={{paddingBottom: "12px"}}>Фитнес-тренер</Typography.Title>
      {!isMobile && <div style={{display: "flex", gap: "16px"}}>
        {items.map(item => 
          <div key={item.key}>{item.label}</div>
        )}
      </div>}
      {isMobile && <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <Button type="primary">Меню</Button>
      </Dropdown>}
    </Layout.Header>
  )
} 