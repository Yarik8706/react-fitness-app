import {useEffect, useState} from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { handleGetVideo, saveVideoToDB, deleteVideoFromDB } from '../utils.js';

export default function VideoUploader ({ value, onChange }) {
  const [videoId, setVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [isMessageSuccess, setIsMessageSuccess] = useState(true);
  
  useEffect(() => {
    const {videoUrl, videoId, isSuccess} = handleGetVideo();
    
    if (isSuccess) {
      setVideoUrl(videoUrl);
      setVideoId(videoId);
    }
  }, []);
  
  const handleFileChange = async (info) => {
    const { file } = info;
    if (file.status === 'done') {
      const video = file.originFileObj;
      
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(video);
      videoElement.onloadedmetadata = async () => {
        if (videoElement.duration > 60) {
          setMessage('Видео должно быть не длиннее 1 минуты!');
          setIsMessageSuccess(false);
          return;
        }

        try {
          if (videoId) {
            await deleteVideoFromDB(videoId);
            setVideoId(null);
            setVideoUrl(null);
          }
          
          const id = await saveVideoToDB(video);
          setVideoId(id);
          const url = URL.createObjectURL(video);
          setVideoUrl(url);
          onChange(id);
          setMessage('Видео успешно загружено!');
          setIsMessageSuccess(true);
        } catch (error) {
          console.error('Ошибка при сохранении видео:', error);
          setMessage('Ошибка при сохранении видео');
          setIsMessageSuccess(false);
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

      {message !== '' && (
        <p style={{ color: isMessageSuccess ? 'green' : 'red', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </div>
  );
};