import { GalleryItem, PageLayout } from "./types";

const TARGET_RATIO = 9 / 16; // 0.5625

function closestVideoIndex(
  items: GalleryItem[],
  lookahead: number
): number {
  let bestIndex = -1;
  let smallestDiff = Infinity;

  const max = Math.min(items.length, lookahead);

  for (let i = 0; i < max; i++) {
    const item = items[i];

    if (item.type !== "video") continue;

    const ratio = item.aspectRatio ?? TARGET_RATIO;
    const diff = Math.abs(ratio - TARGET_RATIO);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function buildPages(
  items: GalleryItem[],
  opts?: { lookahead?: number }
): PageLayout[] {
  const lookahead = opts?.lookahead ?? 12;

  const remaining = [...items];
  const pages: PageLayout[] = [];

  while (remaining.length >= 3) {
    let selectedVideoIndex = closestVideoIndex(remaining, lookahead);

    let video: GalleryItem | undefined;

    if (selectedVideoIndex !== -1) {
      video = remaining.splice(selectedVideoIndex, 1)[0];
    }

    const images: GalleryItem[] = [];
    const others: GalleryItem[] = [];

    for (let i = 0; i < remaining.length; i++) {
      const item = remaining[i];
      if (item.type === "image") {
        images.push(item);
      } else {
        others.push(item);
      }
    }

    let left: GalleryItem;
    let rightTop: GalleryItem;
    let rightBottom: GalleryItem;

    if (video && images.length >= 2) {
  
      left = video;

      rightTop = images.shift()!;
      rightBottom = images.shift()!;
    } else {
      
      left = remaining.shift()!;
      rightTop = remaining.shift()!;

      rightBottom = remaining.shift()!;
    }

    // Remove used images
    remaining.splice(0, 0);
    
    remaining.splice(
      0,
      remaining.length,
      ...remaining.filter(
        (r) => r !== rightTop && r !== rightBottom
      )
    );

    pages.push({ left, rightTop, rightBottom });
  }

  return pages;
}
