import React from 'react';
import { Modal, Tag, Row, Col, Image, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function ExerciseInfoModal({ exercise, visible, onClose }) {
  if (!exercise) return null;

  const {
    name,
    description,
    difficulty,
    equipment,
    tags,
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
        {/* Изображения */}
        {images.length > 0 && (
          <Col span={24}>
            <Image.PreviewGroup>
              <Row gutter={[8, 8]}>
                {images.map((image, index) => (
                  <Col key={index}>
                    <Image
                      src={image}
                      alt={`Exercise ${index + 1}`}
                      width={150}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </Col>
        )}

        {/* Видео */}
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

        {/* Описание */}
        <Col span={24}>
          <Title level={5}>Описание</Title>
          <Paragraph>{description}</Paragraph>
        </Col>

        {/* Сложность */}
        <Col span={24}>
          <Title level={5}>Сложность</Title>
          <Tag color={difficulty === 'легкая' ? 'green' : difficulty === 'средняя' ? 'orange' : 'red'}>
            {difficulty}
          </Tag>
        </Col>

        {/* Оборудование */}
        <Col span={24}>
          <Title level={5}>Оборудование</Title>
          <Paragraph>{equipment}</Paragraph>
        </Col>

        {/* Теги */}
        <Col span={24}>
          <Title level={5}>Теги</Title>
          <div>
            {tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  );
}