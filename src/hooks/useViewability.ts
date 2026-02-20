import { useRef } from "react";
import { ViewToken } from "react-native";

export const useViewability = (
  onVisiblePageChange: (index: number) => void
) => {
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? 0;
        onVisiblePageChange(index);
      }
    }
  ).current;

  return { viewabilityConfig, onViewableItemsChanged };
};
