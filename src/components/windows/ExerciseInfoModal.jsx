import React, {useEffect, useState} from 'react';
import { Modal, Tag, Row, Col, Image, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import {difficultyColors, difficultyTexts} from "../../constants.js";
import ImagesPreview from "../ImagesPreview.jsx";
import {handleGetVideo} from "../../utils.js";
import Video from "../Video.jsx";

const { Title, Paragraph } = Typography;

export default function ExerciseInfoModal({ exercise, visible, onClose }) {
  if (!exercise) return null;

  const {
    title,
    description,
    difficulty,
    equipment = [],
    tags = [],
    images = [],
    video
  } = exercise;

  return (
    <Modal
      title={<span style={{fontSize: "24px", fontWeight: "bold"}}>{title}</span>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Row gutter={[16, 16]}>
        {description && <Col span={24}>
          <Title level={5}>Описание</Title>
          <Paragraph>{description}</Paragraph>
        </Col>}

        <Col span={24}>
          <Title level={5}>Сложность</Title>
          <Tag color={difficultyColors[difficulty]}>
            {difficultyTexts[difficulty].toUpperCase()}
          </Tag>
        </Col>

        {equipment.length > 0 && <Col span={24}>
          <Title level={5}>Оборудование</Title>
          <div>
            {equipment.map((tag, index) => (
              <Tag key={index} color="grey">
                {tag}
              </Tag>
            ))}
          </div>
        </Col>}

        {tags.length > 0 && <Col span={24}>
          <Title level={5}>Теги</Title>
          <div>
            {tags.map((tag, index) => (
              <Tag key={index} color="grey">
                {tag}
              </Tag>
            ))}
          </div>
        </Col>}

        {images.length > 0 && <Col span={24}>
          <Title level={5}>Изображения</Title>
          <ImagesPreview images={images} />
        </Col>}
        
        {video && (
          <Col span={24}>
            <Title level={5}>Видео</Title>
            <Video id={video} />
          </Col>
        )}
      </Row>
    </Modal>
  );
}