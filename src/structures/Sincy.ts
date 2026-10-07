import { createCanvas } from "@napi-rs/canvas";
import { registerFont } from "../functions/registerFonts.js";
import { formatTime } from "../functions/formatTime.js";
import { truncate } from "../functions/truncate.js";
import { fetchImage } from "../functions/fetchImage.js";
import type { SincyOptions } from "../types/index.js";

export async function Sincy(options: SincyOptions): Promise<Buffer> {
  if (!options.artwork) throw new Error("artwork is required");
  if (!options.title) throw new Error("title is required");
  if (!options.author) throw new Error("author is required");
  if (!Number.isFinite(options.duration) || options.duration <= 0) {
    throw new Error("duration must be a number greater than 0");
  }
  if (!Number.isFinite(options.position) || options.position < 0) {
    throw new Error("position must be a number greater than or equal to 0");
  }

  const scale = options.scale ?? 2;
  if (!Number.isFinite(scale) || scale < 1 || scale > 4) {
    throw new Error("scale must be a number between 1 and 4");
  }
  const quality = options.quality ?? 90;
  if (!Number.isFinite(quality) || quality < 0 || quality > 100) {
    throw new Error("quality must be a number between 0 and 100");
  }
  const timeout = options.timeout ?? 10_000;
  if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new Error("timeout must be a number greater than 0");
  }

  registerFont("Righteous-Regular.ttf", "Righteous");

  const title = truncate(options.title, 20);
  const author = truncate(options.author, 25);

  const img = await fetchImage(options.artwork, timeout);
  const { width: iw, height: ih } = img;

  const frame = createCanvas(Math.round(1700 * scale), Math.round(560 * scale));
  const ctx = frame.getContext("2d");
  ctx.scale(scale, scale);

  const bgScale = Math.max(1700 / iw, 560 / ih);
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.filter = "blur(20px)";
  ctx.drawImage(
    img,
    (iw - 1700 / bgScale) / 2,
    (ih - 560 / bgScale) / 2,
    1700 / bgScale,
    560 / bgScale,
    0,
    0,
    1700,
    560
  );
  ctx.restore();

  const sq = Math.min(iw, ih);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(45, 40, 480, 480, 20);
  ctx.clip();
  ctx.drawImage(img, (iw - sq) / 2, (ih - sq) / 2, sq, sq, 45, 40, 480, 480);
  ctx.restore();

  ctx.fillStyle = "rgba(0, 0, 0, 0.63)";
  ctx.beginPath();
  ctx.roundRect(567, 40, 1100, 480, 20);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "bold 70px 'Righteous', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(title, 620, 100, 980);

  ctx.fillStyle = "#A79D9D";
  ctx.font = "50px 'Righteous', sans-serif";
  ctx.fillText(author, 620, 230, 980);

  ctx.beginPath();
  ctx.roundRect(620, 370, 980, 30, 15);
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.fill();

  const progress = Math.min(options.position / options.duration, 1);
  const width = Math.max(progress * 980, 30);
  const knobX = 620 + progress * 980;
  const knobY = 385;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(620, 370, width, 30, 15);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(knobX, knobY, 24, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(knobX, knobY, 12, 0, 2 * Math.PI);
  ctx.fillStyle = "#1a1a1a";
  ctx.fill();

  ctx.fillStyle = "#A79D9D";
  ctx.font = "bold 32px 'Righteous', sans-serif";
  ctx.textBaseline = "top";

  ctx.textAlign = "left";
  ctx.fillText(formatTime(options.position), 620, 430);

  ctx.textAlign = "right";
  ctx.fillText(formatTime(options.duration), 1600, 430);

  return frame.encode("jpeg", quality);
}
