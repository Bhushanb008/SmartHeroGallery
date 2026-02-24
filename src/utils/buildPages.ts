import { GalleryItem, PageLayout } from './types';

const TARGET_RATIO = 9 / 16;

function closestVideoIndex(items: GalleryItem[], lookahead: number): number {
  let bestIndex = -1;
  let smallestDiff = Infinity;

  const max = Math.min(items.length, lookahead);

  for (let i = 0; i < max; i++) {
    const item = items[i];

    if (item.type !== 'video') continue;

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
  opts?: { lookahead?: number },
): PageLayout[] {
  const lookahead = opts?.lookahead ?? 12;

  const remaining = [...items];
  const pages: PageLayout[] = [];

  while (remaining.length >= 3) {
    let left: GalleryItem;
    let rightTop: GalleryItem;
    let rightBottom: GalleryItem;

    const selectedVideoIndex = closestVideoIndex(remaining, lookahead);

    // Case 1: Good video available
    if (selectedVideoIndex !== -1) {
      const video = remaining[selectedVideoIndex];

      // find first two images excluding that video index
      const imageIndexes: number[] = [];

      for (let i = 0; i < remaining.length; i++) {
        if (i === selectedVideoIndex) continue;
        if (remaining[i].type === 'image') {
          imageIndexes.push(i);
        }
        if (imageIndexes.length === 2) break;
      }

      if (imageIndexes.length === 2) {
        left = video;
        rightTop = remaining[imageIndexes[0]];
        rightBottom = remaining[imageIndexes[1]];

        // Remove in descending order to avoid index shift
        const indexesToRemove = [
          selectedVideoIndex,
          imageIndexes[0],
          imageIndexes[1],
        ].sort((a, b) => b - a);

        for (const index of indexesToRemove) {
          remaining.splice(index, 1);
        }

        pages.push({ left, rightTop, rightBottom });
        continue;
      }
    }

    // Case 2: Fallback – just take first 3
    left = remaining.shift()!;
    rightTop = remaining.shift()!;
    rightBottom = remaining.shift()!;

    pages.push({ left, rightTop, rightBottom });
  }

  return pages;
}
