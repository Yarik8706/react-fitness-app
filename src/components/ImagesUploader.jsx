import React, { useState, useCallback, useEffect } from "react";
import {Upload, Button, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImagesPreview from "./ImagesPreview.jsx";

export default function ImagesUploader({ value, onChange }) {
  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    if (value) {
      setImageSrcList(value);
    }
  }, [value]);

  const handleFileChange = useCallback(
    (info) => {
      const { fileList } = info;
      const newImageSrcList = [...imageSrcList];

      fileList.forEach((file) => {
        if (file.status === "done") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target.result;
            newImageSrcList.push(base64);

            // Если все файлы обработаны, обновляем состояние и вызываем callback
            if (newImageSrcList.length === imageSrcList.length + fileList.length) {
              setImageSrcList(newImageSrcList);
              onChange(newImageSrcList); // Передаем массив base64 в функцию
              message.success(`${fileList.length} изображений успешно загружено`);
            }
          };
          reader.readAsDataURL(file.originFileObj);
        } else if (file.status === "error") {
          message.error(`${file.name} не удалось загрузить`);
        }
      });
    },
    [onChange, imageSrcList]
  );

  const handlePaste = useCallback(
    (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      const newImageSrcList = [...imageSrcList];

      Array.from(items).forEach((item) => {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target.result;
            newImageSrcList.push(base64);

            // Обновляем состояние и вызываем callback
            setImageSrcList(newImageSrcList);
            onChange(newImageSrcList); // Передаем массив base64 в функцию
            message.success("Изображение вставлено из буфера обмена");
          };
          reader.readAsDataURL(blob);
        }
      });
    },
    [onChange, imageSrcList]
  );

  const handleRemoveImage = useCallback(
    (index) => {
      const newImageSrcList = imageSrcList.filter((_, i) => i !== index);
      setImageSrcList(newImageSrcList);
      onChange(newImageSrcList);
    },
    [imageSrcList, onChange]
  );

  const handleMoveImage = useCallback(
    (fromIndex, toIndex) => {
      const newImageSrcList = [...imageSrcList];
      const [removed] = newImageSrcList.splice(fromIndex, 1);
      newImageSrcList.splice(toIndex, 0, removed);
      setImageSrcList(newImageSrcList);
      onChange(newImageSrcList);
    },
    [imageSrcList, onChange]
  );

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <div style={{ maxWidth: "500px" }}>
      {/* Компонент Upload из antd с поддержкой множественной загрузки */}
      <Upload
        accept="image/*"
        multiple
        showUploadList={false}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => onSuccess("ok"), 0); // Имитация успешной загрузки
        }}
        onChange={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Выберите изображения</Button>
      </Upload>

      <ImagesPreview
        images={imageSrcList}
        onRemoveImage={handleRemoveImage}
        onMoveImage={handleMoveImage}
      />
    </div>
  );
}