import { useEffect } from 'react';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectImages,
  initialLoad
} from './imagesSlice';

export function Images() {
  const images = useAppSelector(selectImages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialLoad());
  }, [])

  return (
    <>
      <Container maxWidth="sm">
        <ImageList sx={{ width: 500}} variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.urls.small}`}
                srcSet={`${item.urls.small}`}
                alt={item.alt}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
}
