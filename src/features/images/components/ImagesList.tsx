import { useState } from 'react';
import { Modal, Link, Box, ImageListItem, ImageList, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import {
  selectImages
} from '../imagesSlice';
import { Image } from '../types';

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const imageContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

export const ImagesList: React.FunctionComponent = () => {
  const images = useAppSelector(selectImages);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();

  const handleClose = () => setSelectedImage(undefined);

  const renderEmptyMessage = (): React.ReactNode => {
    return <Typography mt={2}> Sorry, nothing found :( </Typography>;
  }

  const renderList = (): React.ReactNode => {
    return (
      <>
        <ImageList variant="masonry" cols={7} gap={8}>
          {images.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => {
                console.log('image click')
                setSelectedImage(item)
              }}
            >
                <img
                  src={`${item.urls.small}`}
                  srcSet={`${item.urls.small}`}
                  alt={item.alt}
                  loading="lazy"
                  onClick={() => {
                    setSelectedImage(item);
                  }}
                />
            </ImageListItem>
          ))}
        </ImageList>
        <Modal
          open={Boolean(selectedImage)}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle}>
            <div style={imageContainerStyle}>
              <img
                style={{maxWidth: '100%', maxHeight: 500}}
                src={`${selectedImage?.urls.regular}`}
                alt={selectedImage?.alt}
              />
            </div>
            <Link href={selectedImage?.urls.full} target="_blank"> Open in a new tab</Link>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <>
      {images.length ? renderList() : renderEmptyMessage()}
    </>
  );
}
