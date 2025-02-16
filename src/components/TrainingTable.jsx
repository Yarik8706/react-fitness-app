import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


export default function TrainingTable() {
  const data = [
    {
      key: '1',
      title: 'Приседания',
      exercisesCount: 3,
    },
    {
      key: '2',
      title: 'Бег на месте',
      exercisesCount: 2,
    },
    {
      key: '3',
      title: 'Прыжки',
      exercisesCount: 1,
    },
    {
      key: '4',
      title: 'Приседания',
      exercisesCount: 5,
    },
  ];

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
    },
    {
      title: 'Количество упражнений',
      dataIndex: 'exercisesCount',
      key: 'exercisesCount',
      sorter: (a, b) => a.exercisesCount - b.exercisesCount,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => {}}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    }
  ];
  
  return (
    <Table columns={columns} dataSource={data} />
  )
} 