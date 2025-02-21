import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlayCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {useTrainings} from "../contexts/TrainingsContext.jsx";
import {useExercises} from "../contexts/ExercisesContext.jsx";
import {useAppContext} from "../contexts/AppContext.jsx";

export default function TrainingTable({editModeState = true, 
                                        onChangePlayMode = ({id, isActive}) => {}}) {
  const {trainings, changeTrainings, setTrainingInfoModalState, setTrainingFormState} = useTrainings();
  const {setRemoveSomethingModalState} = useExercises()
  const {isMobile} = useAppContext();
  
  function deleteTraining(id) {
    const newTrainings = trainings.filter(training => training.id !== id);
    changeTrainings(newTrainings);
  }
  
  
  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      width: isMobile ? '50%' : '30%',
    },
    {
      title: 'Количество упражнений',
      dataIndex: 'exercises',
      key: 'exercisesCount',
      sorter: (a, b) => a.exercises.length - b.exercises.length,
      sortDirections: ['descend', 'ascend'],
      render: (_, {exercises}) => (
        <>{exercises.length}</>
      )
    },
    {
      title: 'Действия',
      key: 'action',
      width: isMobile ? '50%' : '25%',
      render: (index, record) => (
        <Space size={isMobile ? "small" : "middle"}>
          {!editModeState && <Button type="primary" onClick={
            () => onChangePlayMode({id: record.id, isActive:true})}>
            <PlayCircleOutlined />
          </Button>}
          <Button type="primary" onClick={
            () => setTrainingInfoModalState({training: record, visible: true})}>
            <SearchOutlined  />
          </Button>
          {editModeState && <><Button type="primary" onClick={
            () => {setTrainingFormState(
              {
                training: record,
                visible: true,
                isEdit: true
              })
            }
          }>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => {
            setRemoveSomethingModalState({
              visible: true,
              text: "Вы действительно хотите удалить тренировку?",
              onAction: (s) => {
                setRemoveSomethingModalState({visible: false, title: "", onAction: () => {}});
                if (s) deleteTraining(record.id)
              }
            })
          }}>
            <DeleteOutlined />
          </Button></>}
        </Space>
      ),
    }
  ];
  
  if (isMobile) {
    columns.splice(1, 1)
  }
  
  return (
    <Table columns={columns} dataSource={trainings} style={{width:'100%'}}/>
  )
} 