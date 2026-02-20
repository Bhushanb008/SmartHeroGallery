
---

## API Endpoint Used

https://dev.iamalive.app/api/destinations/experience/learn-horse-riding-and-trot-down-a-private-forest-trail?fields=gallery

The gallery array is extracted from:
json.data.gallery

---

## Page Building Logic

- Original API order is preserved.
- Items are chunked into pages of 3.
- Layout per page:
- Left: 1 large tile (full height)
- Right: 2 stacked tiles
- Videos are placed first on each page.
- If multiple videos exist, the one closest to 9:16 ratio is chosen.

Aspect ratio is calculated using:
height / width

The video with ratio closest to 1.777 is selected.

---

## CDN Fallback Strategy

For Images:
preview → processed → original

For Videos:
processed → original

If a URL fails (404), fallback automatically switches to the next available source.

---

## Performance Optimisations

- FlatList with:
- pagingEnabled
- initialNumToRender
- windowSize
- removeClippedSubviews
- getItemLayout
- React.memo used on:
- GalleryPage
- MediaTile
- ProgressiveImage
- ProgressiveVideo
- Viewability tracking to:
- Auto-play visible videos
- Pause off-screen videos
- Prefetch next page media for smoother scroll
- Lazy rendering of video component only when active

Tested with 100+ gallery items.

---

## What I Would Improve With More Time

- Add disk caching layer
- Add animated transitions between pages
- Add skeleton loaders
- Improve error boundary UI
- Add pinch-to-zoom in fullscreen
- Add better retry UX for CDN failures