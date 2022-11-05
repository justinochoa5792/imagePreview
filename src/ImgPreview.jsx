import React, { useEffect, useRef, useState } from "react";

const ImgPreview = ({ imageSrc, onClose }) => {
  const [scale, setScale] = useState(1);
  const imageRef = useRef();
  const containerRef = useRef();
  const zoom = 1.1;
  const originalWidth = imageRef.current?.naturalWidth ?? 0;
  const originalHeight = imageRef.current?.naturalWidth ?? 0;
  const scaledDimensions = {
    width: scale * originalWidth,
    height: scale * originalHeight,
  };

  const zoomIn = () => {
    setScale(scale + zoom);
  };

  const zoomOut = () => {
    setScale(scale / zoom);
  };
  const zoomReset = () => {
    fitToScreen();
  };

  const fitToScreen = () => {
    const container = containerRef.current;
    const image = imageRef.current;
    const containerBounds = container.getBoundingClientRect();
    const heightRatio = containerBounds.height / image.naturalHeight;
    const widthRatio = containerBounds.width / image.naturalWidth;

    setScale(Math.min(heightRatio, widthRatio, 1));
  };

  useEffect(() => {
    fitToScreen();
  }, []);

  return (
    <div className="image-preview">
      <div className="top-bar">
        <button onClick={onClose}>X</button>
      </div>
      <div ref={containerRef} className="preview">
        <img
          className="imagePrev"
          ref={imageRef}
          src={imageSrc}
          alt={imageSrc.name}
          style={scaledDimensions}
        />
      </div>
      <div className="bottom-bar">
        <button onClick={zoomOut}>-</button>
        <button onClick={zoomReset}>{Math.round(scale * 100)}%</button>
        <button onClick={zoomIn}>+</button>
      </div>
    </div>
  );
};

export default ImgPreview;
