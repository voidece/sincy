import { loadImage, type Image } from "@napi-rs/canvas";
import type { Artwork } from "../types/index.js";

export async function fetchArtwork(artwork: Artwork, timeout: number): Promise<Image> {
  const img = await loadImage(artwork, { requestOptions: { signal: AbortSignal.timeout(timeout) } });
  if (!img.width || !img.height) throw new Error("artwork has no dimensions");
  return img;
}
