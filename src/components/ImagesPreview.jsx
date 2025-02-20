import React from "react";
import { Image, Button } from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined} from "@ant-design/icons";

export default function ImagesPreview(
  { images, onRemoveImage=null, onMoveImage=null }) {
  return (
    <Image.PreviewGroup>
      <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px"}}>
        {images.map((image, index) => (
          <div key={index} style={{position: "relative"}}>
            <Image
              src={image}
              alt={`preview-${index}`}
              width={150}
              height={150}
              style={{objectFit: "cover"}}
            />
            {onRemoveImage && onMoveImage && <>
              <Button
                icon={<CloseOutlined/>}
                style={{position: "absolute", 
                  top: 0, 
                  right: 0}}
                onClick={() => onRemoveImage(index)}
              />
              {index > 0 && (
                <Button
                  icon={<ArrowLeftOutlined/>}
                  style={{position: "absolute", 
                    transform: "translateY(+50%)",
                    bottom: "50%", 
                    left: 0}}
                  onClick={() => onMoveImage(index, index - 1)}
                ></Button>
              )}
              {index < images.length - 1 && (
                <Button
                  icon={<ArrowRightOutlined/>}
                  style={{position: "absolute",
                    transform: "translateY(+50%)",
                    bottom: "50%",
                    right: 0}}
                  onClick={() => onMoveImage(index, index + 1)}
                >
                  
                </Button>
              )}
            </>}
          </div>
        ))}
      </div>
    </Image.PreviewGroup>
  );
}