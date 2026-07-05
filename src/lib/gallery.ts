import fs from "fs";
import path from "path";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Parses a JPEG file to find its dimensions (width and height) by scanning the markers.
 * This is very fast and has zero runtime dependencies.
 */
function getJpegSize(filePath: string): { width: number; height: number } | null {
  try {
    const buffer = fs.readFileSync(filePath);
    let i = 2; // Skip start-of-image marker (FF D8)
    while (i < buffer.length - 1) {
      const marker = buffer.readUInt16BE(i);
      i += 2;
      if (marker === 0xFFC0 || marker === 0xFFC2) {
        // SOF0 (Baseline DCT) or SOF2 (Progressive DCT)
        i += 3; // Skip segment length (2 bytes) and data precision (1 byte)
        const height = buffer.readUInt16BE(i);
        i += 2;
        const width = buffer.readUInt16BE(i);
        return { width, height };
      } else {
        // Other markers: skip their payload length
        if (i < buffer.length - 1) {
          const length = buffer.readUInt16BE(i);
          i += length;
        } else {
          break;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to parse JPEG dimensions for file: ${filePath}`, error);
  }
  return null;
}

/**
 * Reads the public/gallery directory on the server, reads details for each image,
 * and returns their dynamic paths, widths, and heights.
 */
export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  try {
    if (!fs.existsSync(galleryDir)) {
      console.warn(`Gallery directory does not exist at: ${galleryDir}`);
      return [];
    }

    const files = fs
      .readdirSync(galleryDir)
      .filter((file) => /\.(jpe?g|png)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    const images: GalleryImage[] = [];
    for (const file of files) {
      const filePath = path.join(galleryDir, file);
      const size = getJpegSize(filePath);
      
      images.push({
        src: `/gallery/${file}`,
        width: size ? size.width : 1200, // Fallback width
        height: size ? size.height : 800, // Fallback height
      });
    }
    return images;
  } catch (error) {
    console.error("Failed to read gallery directory:", error);
    return [];
  }
}
