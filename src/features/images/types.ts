export interface SearchImages {
  query: string,
  page?: number,
  color?: Color,
  orientation?: Orientation,
  orderBy?: OrderBy
}

export interface ListImages {
  page?: number
}

export interface ImagesRes {
  images: Image[],
  totalPages: number
}

export interface Image {
  id: string,
  alt: string,
  username: string,
  color: string
  urls: ImageUrls,
  orientation: Orientation
}

export interface ImageUrls {
  full: string,
  raw: string,
  regular: string,
  small: string,
  thumb: string
}

export enum Orientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  SQUARE = "squarish"
}

export enum OrderBy {
  LATEST = "latest",
  RELEVANT = "relevant"
}

export enum Color {
  BLACK_AND_WHITE = "black_and_white",
  BLACK = "black",
  WHITE = "white",
  YELLOW = "yellow",
  ORANGE = "orange",
  RED = "red",
  PURPLE = "purple",
  MAGENTA = "magenta",
  GREEN = "green",
  TEAL = "teal",
  BLUE = "blue"
}