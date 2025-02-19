import {useEffect, useRef, useState} from 'react';
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function VideoUploader ({ value, onChange }) {
  const [videoId, setVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const handleGetVideo = async () => {
      if (value) {
        try {
          const videoFile = await getVideoFromDB(value);
          const url = URL.createObjectURL(videoFile);
          setVideoUrl(url);
          setVideoId(value);
        } catch (error) {
          console.error('Ошибка при получении видео:', error);
          message.error('Ошибка при получении видео');
        }
      }
    };

    const getVideoFromDB = async (id) => {
      const db = await openDB();
      const transaction = db.transaction('videos', 'readonly');
      const store = transaction.objectStore('videos');

      return new Promise((resolve, reject) => {
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result?.file);
        request.onerror = () => reject(request.error);
      });
    };
    
    handleGetVideo();
  }, []);

  // Функция для открытия IndexedDB
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('VideoDB', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  // Функция для сохранения видео в IndexedDB
  const saveVideoToDB = async (file) => {
    const db = await openDB();
    const transaction = db.transaction('videos', 'readwrite');
    const store = transaction.objectStore('videos');

    return new Promise((resolve, reject) => {
      const request = store.add({ file });

      request.onsuccess = () => resolve(request.result); // Возвращает ID видео
      request.onerror = () => reject(request.error);
    });
  };

  // Функция для удаления видео из IndexedDB
  const deleteVideoFromDB = async (id) => {
    const db = await openDB();
    const transaction = db.transaction('videos', 'readwrite');
    const store = transaction.objectStore('videos');

    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  };

  // Обработчик выбора файла
  const handleFileChange = async (info) => {
    const { file } = info;
    if (file.status === 'done') {
      const video = file.originFileObj;

      // Проверка длительности видео
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(video);
      videoElement.onloadedmetadata = async () => {
        if (videoElement.duration > 60) {
          setMessage('Видео должно быть не длиннее 1 минуты!');
          return;
        }

        try {
          // Удаляем старое видео, если оно есть
          if (videoId) {
            await deleteVideoFromDB(videoId);
            setVideoId(null);
            setVideoUrl(null);
          }

          // Сохраняем новое видео
          const id = await saveVideoToDB(video);
          setVideoId(id);
          const url = URL.createObjectURL(video);
          setVideoUrl(url);
          onChange(id); // Передаем ID видео в форму
          setMessage('Видео успешно загружено!');
        } catch (error) {
          console.error('Ошибка при сохранении видео:', error);
          setMessage('Ошибка при сохранении видео');
        }
      };
    }
  };
  
  useEffect(() => {
    if (!value) {
      setVideoId(null);
      setVideoUrl(null);
    }
  }, [value]);

  return (
    <div style={{ paddingBottom: '10px' }}>
      <Upload
        accept="video/*"
        customRequest={({ file, onSuccess }) => onSuccess('ok')}
        onChange={handleFileChange}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Выберите видео</Button>
      </Upload>
      <p style={{ color: 'gray', marginTop: '10px' }}>
        Видео должно быть не длиннее 1 минуты.
      </p>

      {videoUrl && (
        <div style={{ marginTop: '10px' }}>
          <video controls style={{ width: '100%', maxWidth: '500px' }}>
            <source src={videoUrl} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
      )}

      {message !== '' && (<Modal title={message} visible={true} onCancel={() => setMessage('')} />)}
    </div>
  );
};