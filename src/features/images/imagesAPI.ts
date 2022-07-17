import { createApi } from 'unsplash-js';
import { ImagesRes, ListImages, Orientation, SearchImages } from './types';

const ACCESS_KEY = '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';
const IMAGES_PER_PAGE = 20;

const unsplash = createApi({
  accessKey: ACCESS_KEY,
});

export async function listImages({page}: ListImages): Promise<ImagesRes> {
  const result = await unsplash.photos.list({perPage: IMAGES_PER_PAGE, page});

  return {
    images: result.response?.results.map((photo) => ({
      id: photo.id,
      alt: photo.alt_description || '',
      color: photo.color || '',
      username: photo.user.username,
      urls: photo.urls,
      orientation: getOrientation(photo.width, photo.height)
    })) || [],
    totalPages: result.response?.total ? Math.ceil(result.response?.total / IMAGES_PER_PAGE) : 0
  };
}

export async function searchImages(
  {
    query,
    page,
    color,
    orientation,
    orderBy
  }: SearchImages
): Promise<ImagesRes> {
  const result = await unsplash.search.getPhotos({
    query,
    page: page || 1,
    perPage: IMAGES_PER_PAGE,
    color,
    orientation,
    orderBy
  });

  return {
    images: result.response?.results.map((photo) => ({
      id: photo.id,
      alt: photo.alt_description || '',
      color: photo.color || '',
      username: photo.user.username,
      urls: photo.urls,
      orientation: getOrientation(photo.width, photo.height)
    })) || [],
    totalPages: result.response?.total_pages || 0
  };
}

const getOrientation = (width: number, height: number) => {
  if (height > width) {
    return Orientation.PORTRAIT;
  }
  if (width > height) {
    return Orientation.LANDSCAPE;
  }

  return Orientation.SQUARE;
}
