import { createApi } from 'unsplash-js';
import { Image, Orientation, SearchImages } from './types';

const ACCESS_KEY = '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';

const unsplash = createApi({
  accessKey: ACCESS_KEY,
});

export async function getInitialImages(): Promise<Image[]> {
  const result = await unsplash.photos.list({});

  return result.response?.results.map((photo) => ({
    id: photo.id,
    alt: photo.alt_description || '',
    color: photo.color || '',
    username: photo.user.username,
    urls: photo.urls,
    orientation: getOrientation(photo.width, photo.height)
  })) || [];
}

export async function searchImages(
  {
    query,
    page,
    color,
    orientation,
    orderBy
  }: SearchImages
): Promise<Image[]> {
  const result = await unsplash.search.getPhotos({
    query,
    page: page || 1,
    perPage: 10,
    color,
    orientation,
    orderBy
  });

  return result.response?.results.map((photo) => ({
    id: photo.id,
    alt: photo.alt_description || '',
    color: photo.color || '',
    username: photo.user.username,
    urls: photo.urls,
    orientation: getOrientation(photo.width, photo.height)
  })) || [];
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
