import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";

function crc32(buffer) {
  let crc = ~0;
  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([typeBuffer, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function png(width, height, pixel) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a] = pixel(x, y);
      const offset = row + 1 + x * 4;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const cream = [243, 238, 230, 255];
const clay = [122, 64, 48, 255];
const paper = [255, 250, 247, 255];

function icon(size, maskable) {
  return png(size, size, (x, y) => {
    const nx = (x + 0.5) / size - 0.5;
    const ny = (y + 0.5) / size - 0.5;
    const distance = Math.hypot(nx, ny);
    const outer = maskable ? 0.2 : 0.28;
    const inner = maskable ? 0.12 : 0.17;
    const dot = maskable ? 0.035 : 0.045;
    const background = maskable ? clay : cream;
    const ring = maskable ? paper : clay;
    const center = maskable ? clay : paper;

    if (distance > outer) return background;
    if (distance > inner) return ring;
    if (Math.hypot(nx, ny + 0.02) < dot) return center;
    return ring;
  });
}

mkdirSync("public/icons", { recursive: true });
writeFileSync("public/icons/icon-192.png", icon(192, false));
writeFileSync("public/icons/icon-512.png", icon(512, false));
writeFileSync("public/icons/icon-maskable-512.png", icon(512, true));
writeFileSync("app/icon.png", icon(192, false));
writeFileSync("app/apple-icon.png", icon(180, false));
