const segmenter = new Intl.Segmenter();

export function truncate(text: string, max: number): string {
  const chars = Array.from(segmenter.segment(text), (part) => part.segment);
  return chars.length > max ? `${chars.slice(0, max - 3).join("")}...` : text;
}
