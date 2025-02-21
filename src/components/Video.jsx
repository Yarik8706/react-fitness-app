import React, {useEffect, useState} from "react";
import {handleGetVideo} from "../utils.js";

export default function Video({id}) {
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    getVideoUrl();
  }, []);

  async function getVideoUrl() {
    if (id === null) return;
    const {videoUrl, isSuccess} = await handleGetVideo(id);
    if (isSuccess) return setVideoSrc(videoUrl);
  }

  return (<>
      {videoSrc && (
        <div style={{position: 'relative', paddingTop: '56.25%'}}>
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
              <source src={videoSrc} type="video/mp4"/>
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          </div>
      )}
    </>)
}