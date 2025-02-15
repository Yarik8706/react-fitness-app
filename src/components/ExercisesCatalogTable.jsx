import {Button, Input, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {useState, useRef} from "react";
import {getUniqueStrings, joinArraysOfObject} from "../utils.js";


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const difficultyTexts = ["Легко", "Средне", "Сложно"]
const difficultyColors = ["green", "yellow", "pink"]

export default function ExercisesCatalogTable() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const data = [
    {
      key: '1',
      title: 'John Brown',
      difficulty: 1,
      tags: ["Tag 1", "Tag 2"],
    },
    {
      key: '2',
      title: 'Jim Green',
      difficulty: 1,
      tags: ["Tag 3"],
    },
    {
      key: '3',
      title: 'Joe Black',
      difficulty: 2,
      tags: ["Tag 1", "Tag 3"],
    },
    {
      key: '4',
      title: 'Jim Red',
      difficulty: 0,
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
  ];
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
      width: '40%',
      ...getColumnSearchProps('title', 'Название'),
    },
    {
      title: 'Сложность',
      dataIndex: 'difficulty',
      key: 'difficulty',
      sorter: (a, b) => a.difficulty - b.difficulty,
      sortDirections: ['descend', 'ascend'],
      render: (_, {difficulty}) => (
        <Tag color={difficultyColors[difficulty]}>
          {difficultyTexts[difficulty].toUpperCase()}
        </Tag>
      ),
      width: '20%',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      filters: [
        ...getUniqueStrings(joinArraysOfObject(data, "tags")).map((tag) => {
          return {
            text: tag,
            value: tag,
          };
        })
      ],
      onFilter: (value, data) => {
        return data.tags.includes(value);
      },
      width: '40%',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
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
    <Table style={{width:'100%'}} columns={columns} dataSource={data} onChange={onChange} />
  );
}