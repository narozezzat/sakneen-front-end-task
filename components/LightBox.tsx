import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface LightboxComponentProps {
  photos: string[];
  onClose: () => void;
}


const LightboxComponent: React.FC<LightboxComponentProps> = ({
  photos,
  onClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <Lightbox
      mainSrc={photos[photoIndex]}
      onCloseRequest={onClose}
      nextSrc={photos[(photoIndex + 1) % photos.length]}
      prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % photos.length)
      }
    />
  );
};

export default LightboxComponent;