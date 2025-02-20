import React from 'react';
import { Modal, Tag, Row, Col, Image, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import {difficultyColors, difficultyTexts} from "../../constants.js";
import ImagesPreview from "../ImagesPreview.jsx";

const { Title, Paragraph } = Typography;

export default function ExerciseInfoModal({ exercise, visible, onClose }) {
  if (!exercise) return null;

  const {
    name,
    description,
    difficulty,
    equipment = [],
    tags = [],
    images = [],
    videoUrl,
  } = exercise;

  return (
    <Modal
      title={name}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>Описание</Title>
          <Paragraph>{description}</Paragraph>
        </Col>

        <Col span={24}>
          <Title level={5}>Сложность</Title>
          <Tag color={difficultyColors[difficulty]}>
            {difficultyTexts[difficulty].toUpperCase()}
          </Tag>
        </Col>

        <Col span={24}>
          <Title level={5}>Оборудование</Title>
          <div>
            {equipment.length > 0 && equipment.map((tag, index) => (
              <Tag key={index} color="grey">
                {tag}
              </Tag>
            ))}
          </div>
        </Col>

        <Col span={24}>
          <Title level={5}>Теги</Title>
          <div>
            {tags.length > 0 && tags.map((tag, index) => (
              <Tag key={index} color="grey">
                {tag}
              </Tag>
            ))}
          </div>
        </Col>

        <ImagesPreview images={images} />

        {videoUrl && (
          <Col span={24}>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <video
                controls
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>
          </Col>
        )}
      </Row>
    </Modal>
  );
}