import React from "react";
import {Tag, Segmented, Carousel, Image, Typography} from "antd";
import Video from "./Video.jsx";

const PlayModeExerciseInfo = ({ exercise }) => {
  const availableTabs = [];
  if (exercise.video) availableTabs.push({ label: "Видео", value: "video" });
  if (exercise.images && exercise.images.length > 0) availableTabs.push({ label: "Картинки", value: "images" });
  if (exercise.description) availableTabs.push({ label: "Описание", value: "description" });

  const defaultTab = exercise.video ? "video" :
    exercise.images && exercise.images.length > 0 ? "images" :
      exercise.description ? "description" : null;

  const [selectedTab, setSelectedTab] = React.useState(defaultTab);

  const renderContent = () => {
    if (!selectedTab) return null;

    switch (selectedTab) {
      case "video":
        return (
          <div style={{ textAlign: "center" }}>
            <Video id={exercise.video} />
          </div>
        );
      case "images":
        return (
          <Carousel autoplay infinite={false}>
            {exercise.images.map((img, index) => (
              <div key={index}>
                <Image
                  src={img}
                  width="100%"
                  style={{ objectFit: "cover", aspectRatio: "1/1", objectPosition: "center", overflow: "hidden" }}
                  alt={`Изображение ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        );
      case "description":
        return <p>{exercise.description}</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Typography.Title level={3}>{exercise.title}</Typography.Title>
      <div style={{ marginBottom: "16px" }}>
        {exercise.equipment && exercise.equipment.map((item, index) => (
          <Tag key={index} color="blue">
            {item}
          </Tag>
        ))}
      </div>

      {availableTabs.length > 0 && (
        <Segmented
          options={availableTabs}
          value={selectedTab}
          onChange={setSelectedTab}
          style={{ marginBottom: "16px" }}
        />
      )}

      {renderContent()}
    </>
  );
};

export default PlayModeExerciseInfo;