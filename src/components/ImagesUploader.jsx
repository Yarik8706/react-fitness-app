import React, { useState, useCallback, useEffect } from "react";
import {Upload, Button, Image, message, List} from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function ImagesUploader({ onImagesUpload }) {
  const [imageSrcList, setImageSrcList] = useState([]);

  // Обработка выбора файлов
  const handleFileChange = useCallback(
    (info) => {
      const { fileList } = info;
      const newImageSrcList = [];

      fileList.forEach((file) => {
        if (file.status === "done") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target.result;
            newImageSrcList.push(base64);

            // Если все файлы обработаны, обновляем состояние и вызываем callback
            if (newImageSrcList.length === fileList.length) {
              setImageSrcList(newImageSrcList);
              onImagesUpload(newImageSrcList); // Передаем массив base64 в функцию
              message.success(`${fileList.length} изображений успешно загружено`);
            }
          };
          reader.readAsDataURL(file.originFileObj);
        } else if (file.status === "error") {
          message.error(`${file.name} не удалось загрузить`);
        }
      });
    },
    [onImagesUpload]
  );

  // Обработка вставки через Ctrl+V
  const handlePaste = useCallback(
    (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      const newImageSrcList = [];

      Array.from(items).forEach((item) => {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target.result;
            newImageSrcList.push(base64);

            // Обновляем состояние и вызываем callback
            setImageSrcList((prev) => [...prev, base64]);
            onImagesUpload([...imageSrcList, base64]); // Передаем массив base64 в функцию
            message.success("Изображение вставлено из буфера обмена");
          };
          reader.readAsDataURL(blob);
        }
      });
    },
    [onImagesUpload, imageSrcList]
  );

  // Добавляем обработчик события paste
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
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

      {/* Список загруженных изображений */}
      {imageSrcList.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <List
            dataSource={imageSrcList}
            renderItem={(src, index) => (
              <List.Item key={index}>
                <Image src={src} alt={`Preview ${index}`} style={{ maxWidth: "100%", height: "auto" }} />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}