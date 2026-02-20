import React from "react";
import { View, StyleSheet } from "react-native";
import { PageLayout } from "../utils/types";
import {
  LEFT_COLUMN_WIDTH,
  RIGHT_COLUMN_WIDTH,
  PAGE_HEIGHT,
  RIGHT_TILE_HEIGHT,
  TILE_GAP,
} from "../constants/layout";
import MediaTile from "./MediaTile";

interface Props {
  page: PageLayout;
  index: number;
  currentIndex: number;
  onItemPress: (index: number, pos: number) => void;
}

const GalleryPage: React.FC<Props> = ({
  page,
  index,
  currentIndex,
  onItemPress,
}) => {
  const isActive = index === currentIndex;

  return (
    <View style={styles.container}>
      <MediaTile
        item={page.left}
        style={{ width: LEFT_COLUMN_WIDTH, height: PAGE_HEIGHT }}
        onPress={() => onItemPress(index, 0)}
        isActive={isActive}
      />

      <View style={{ width: RIGHT_COLUMN_WIDTH, }}>
        <MediaTile
          item={page.rightTop}
          style={{ height: RIGHT_TILE_HEIGHT }}
          onPress={() => onItemPress(index, 1)}
          isActive={isActive}
        />
        <View style={{ height: TILE_GAP }} />
        <MediaTile
          item={page.rightBottom}
          style={{ height: RIGHT_TILE_HEIGHT }}
          onPress={() => onItemPress(index, 2)}
          isActive={isActive}
        />
      </View>
    </View>
  );
};

export default React.memo(GalleryPage);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
