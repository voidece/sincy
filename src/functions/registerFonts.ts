import { GlobalFonts } from "@napi-rs/canvas";
import path from "node:path";

const fonts = path.join(import.meta.dirname, "..", "..", "fonts");

export function registerFont(fontFile: string, fontName: string): void {
  if (GlobalFonts.has(fontName)) return;

  const fontPath = path.join(fonts, fontFile);
  if (!GlobalFonts.registerFromPath(fontPath, fontName)) {
    throw new Error(`Failed to register font "${fontName}" from ${fontPath} (missing or invalid file)`);
  }
}
