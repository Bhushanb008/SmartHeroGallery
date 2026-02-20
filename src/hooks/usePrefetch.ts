import { useEffect } from "react";
import { Image } from "react-native";
import { PageLayout } from "../utils/types";
import { buildImageSources } from "../utils/cdn";

export const usePrefetch = (
  pages: PageLayout[],
  currentIndex: number
) => {
  useEffect(() => {
    const nextPage = pages[currentIndex + 1];
    if (!nextPage) return;

    [nextPage.left, nextPage.rightTop, nextPage.rightBottom]
      .filter((item) => item.type === "image")
      .forEach((item) => {
        const { processed } = buildImageSources(item.src);
        Image.prefetch(processed);
      });
  }, [currentIndex, pages]);
};
