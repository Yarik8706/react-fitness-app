import {Button, Input, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {useState, useRef, useEffect} from "react";
import {getUniqueStrings, joinArraysOfObject} from "../utils.js";
import {difficultyColors, difficultyTexts} from "../constants.js";

export default function ExercisesCatalogTable({ exercises, onEdit, onDelete }) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    console.log(exercises)
  }, []);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 4,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            display: 'block',
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      ...getColumnSearchProps('title', 'Название'),
    },
    {
      title: 'Сложность',
      dataIndex: 'difficulty',
      key: 'difficulty',
      sorter: (a, b) => a.difficulty - b.difficulty,
      sortDirections: ['descend', 'ascend'],
      render: (_, {difficulty}) => (
        <>
          {difficulty !== undefined && <Tag color={difficultyColors[difficulty]}>
            {difficultyTexts[difficulty].toUpperCase()}
          </Tag>}
        </> 
      ),
      width: '20%',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      filters: [
        ...getUniqueStrings(joinArraysOfObject(exercises.length > 0 ? exercises : [], "tags")).map((tag) => {
          return {
            text: tag,
            value: tag,
          };
        })
      ],
      onFilter: (value, data) => {
        return data.tags.includes(value);
      },
      width: '20%',
      render: (_, { tags=[] }) => (
        <>
          {tags.map((tag) => {
            if (tag === undefined) return;
            let colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 
              'yellow', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
            let color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Оборудование',
      dataIndex: 'equipment',
      key: 'equipment',
      width: '20%',
      filters: [
        ...getUniqueStrings(joinArraysOfObject(exercises.length > 0 ? exercises : [], "equipment"))
          .map((tag) => {
            if (tag === undefined) return;
          return {
            text: tag,
            value: tag,
          };
        })
      ],
      onFilter: (value, data) => {
        return data.equipment.includes(value);
      },
      render: (_, { equipment=[] }) => (
        <>
          {equipment.map((tag) => {
            if (tag === undefined) return;
            return (
              <Tag color={"grey"} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, { id }) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(id)}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => onDelete(id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    }
  ];
  
  return (
    <Table style={{width:'100%'}} columns={columns} dataSource={exercises} />
  );
}