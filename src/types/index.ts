import type { loadImage } from "@napi-rs/canvas";

export type Artwork = Parameters<typeof loadImage>[0];

export interface SincyOptions {
  title: string;
  author: string;
  duration: number;
  position: number;
  artwork: Artwork;
  scale?: number;
  quality?: number;
  timeout?: number;
}
